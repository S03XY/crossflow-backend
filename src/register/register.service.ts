import { Injectable, OnModuleInit } from '@nestjs/common';
import { CheckDomainDto } from './dto/checkDomain';
import { InjectModel } from '@nestjs/mongoose';
import { IRegister, Register } from './schema/register.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { decodeBytes32String, getAddress } from 'ethers';
import { Chain, createPublicClient, createWalletClient, http } from 'viem';
import { hedera, hederaTestnet, holesky, sepolia } from 'viem/chains';
import {
  HEDERA_REGISTER_CONTRACT,
  HOLESKY_REGISTER_CONTRACT,
  SEPOLIA_REGISTER_CONTRACT,
} from 'src/utils/contracts/config';
import { REGISTER_CONTRACT_ABI } from 'src/utils/contracts/register.abi';
import { privateKeyToAccount } from 'viem/accounts';
import { waitForTransactionReceipt } from 'viem/_types/actions/public/waitForTransactionReceipt';
import { TxnService } from 'src/transaction/transaction.service';
import { TxnStatus } from 'src/transaction/schema/transaction.schema';

@Injectable()
export class RegisterService implements OnModuleInit {
  constructor(
    @InjectModel(Register.name) private readonly register: Model<IRegister>,
    private readonly configService: ConfigService,
    private readonly txnService: TxnService,
  ) {}

  onModuleInit() {
    const singer: any = this.configService.get<string>('SIGNER')!;

    this.eventListener({
      contract: HEDERA_REGISTER_CONTRACT,
      chain: hederaTestnet,
      abi: REGISTER_CONTRACT_ABI,
      singer,
    });
    this.eventListener({
      contract: HOLESKY_REGISTER_CONTRACT,
      chain: holesky,
      abi: REGISTER_CONTRACT_ABI,
      singer,
    });
    this.eventListener({
      contract: SEPOLIA_REGISTER_CONTRACT,
      chain: sepolia,
      abi: REGISTER_CONTRACT_ABI,
      singer,
    });
  }

  checkDomain = async (data: CheckDomainDto) => {
    const response = await this.register.findOne({ domain: data.domain });

    if (response) {
      return { doesExist: true };
    }

    return { doesExist: false };
  };

  registerDomain = async ({
    domain,
    walletAddress,
    chainId,
  }: {
    domain: string;
    walletAddress: string;
    chainId: number;
  }) => {
    const { doesExist } = await this.checkDomain({ domain });
    if (doesExist) {
      await this.register.findOneAndUpdate(
        { domain: domain },
        {
          $push: { registeredChainId: chainId },
        },
        { new: true },
      );
      return;
    }

    const doc = new this.register({
      domain,
      walletAddress,
      registeredChainId: [chainId],
    });

    const docResponse = await doc.save();

    return docResponse;
  };

  addChain = async ({
    domain,
    chainId,
  }: {
    domain: string;
    chainId: number;
  }) => {
    const { doesExist } = await this.checkDomain({ domain });
    if (!doesExist) {
      return null;
    }

    const updateResponse = await this.register.findOneAndUpdate(
      { domain },
      { $push: { registeredChainId: chainId } },
    );

    return updateResponse;
  };

  getregisteredChainIdForDomain = async ({ domain }: { domain: string }) => {
    const response = await this.register.findOne({ domain });

    if (response) {
      return response.registeredChainId;
    }

    return null;
  };

  eventListener = async ({
    contract,
    abi,
    chain,
    singer,
  }: {
    contract: `0x${string}`;
    abi: any;
    chain: Chain;
    singer?: any;
  }) => {
    console.log(`lister started on ${chain.name}`);

    const publicClient = createPublicClient({
      transport: http(),
      chain,
    });

    // ? Rgister intentent events
    publicClient.watchContractEvent({
      address: contract,
      abi,
      eventName: 'EventRegisterIntent',
      onLogs: async (logs) => {
        console.log('register intent logs', logs);

        //  ? we are only emitting single event so
        const event: any = logs[0];
        const byte32Domain = event.args._domain;
        console.log(byte32Domain);
        const domain = decodeBytes32String(byte32Domain);
        console.log('domain: ', domain);

        const registerar = getAddress(event.topics[2].slice(26));
        console.log('registerar: ', registerar);

        const { doesExist } = await this.checkDomain({ domain });
        console.log('doesExist', doesExist);
        if (doesExist) {
          return;
        } else {
          const account = privateKeyToAccount(singer);
          const walletClient = createWalletClient({
            chain,
            transport: http(),
          });

          console.log('before tx');

          const tx = await walletClient.writeContract({
            address: contract,
            abi: REGISTER_CONTRACT_ABI,
            functionName: 'reserveDomain',
            args: [registerar, byte32Domain],
            account,
            chain,
          });

          console.log('tx', tx);

          console.log('insert main tx');
          // TODO this has be called as soon as the rigister event is called
          await this.txnService.insertTxn({
            hash: event.transactionHash,
            chainId: chain.id,
            status: TxnStatus.INITIATED, // TODO initiated and pending should be done will creating txn
          });

          console.log('update main tx');

          await this.txnService.updateMainStatusTxn({
            hash: event.transactionHash,
            status: TxnStatus.CONFIRMED,
          });

          console.log('push internal tx');
          this.txnService.pushInternalTransaction({
            hash: event.transactionHash,
            internalTxn: {
              txn: tx,
              status: TxnStatus.INITIATED,
              chainId: chain.id,
            },
          });

          try {
            await publicClient.waitForTransactionReceipt({
              hash: tx,
            });

            console.log('update internal try tx');

            await this.txnService.updateInternalTxn({
              txn: event.transactionHash,
              internalTxnHash: tx,
              status: TxnStatus.CONFIRMED,
            });
          } catch (err) {
            console.log('update internal catch tx');
            await this.txnService.updateInternalTxn({
              txn: event.transactionHash,
              internalTxnHash: tx,
              status: TxnStatus.FAILED,
            });
          }
        }
      },
    });

    // ? domain is registered
    publicClient.watchContractEvent({
      address: contract,
      abi,
      eventName: 'EventDomainRegistered',
      onLogs: async (logs) => {
        const event: any = logs[0];
        const byte32Domain = event.args._domain;
        console.log(byte32Domain);
        const domain = decodeBytes32String(byte32Domain);
        console.log('domain: ', domain);
        const registerar = getAddress(event.topics[2].slice(26));
        console.log('registerar: ', registerar);

        await this.registerDomain({
          domain,
          walletAddress: registerar,
          chainId: chain.id,
        });

        console.log('domain registered successfully');
      },
    });

    // ? chain is activated
    publicClient.watchContractEvent({
      address: contract,
      abi,
      eventName: 'EventChainActivated',
      onLogs: (logs) => {
        console.log('chain activated logs', logs);
      },
    });
  };
}
