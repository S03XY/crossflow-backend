import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITxn, Txn, TxnStatus } from './schema/transaction.schema';

@Injectable()
export class TxnService {
  constructor(@InjectModel(Txn.name) private readonly txn: Model<ITxn>) {}

  insertTxn = async ({
    hash,
    status,
    chainId,
  }: {
    hash: `0x${string}`;
    status: TxnStatus;
    chainId: number;
  }) => {
    const doc = new this.txn({
      txn: {
        txn: hash,
        chainId,
        status: status,
      },
      internalTxns: [],
    });

    const response = await doc.save();
    return response;
  };

  pushInternalTransaction = async ({
    hash,
    internalTxn,
  }: {
    hash: string;
    internalTxn: { txn: string; chainId: number; status: TxnStatus };
  }) => {
    const response = await this.txn.findOneAndUpdate(
      {
        'txn.txn': hash,
      },
      {
        $push: {
          internalTxns: internalTxn,
        },
      },
      { new: true },
    );

    return response;
  };

  updateMainStatusTxn = async ({
    hash,
    status,
  }: {
    hash: string;
    status: TxnStatus;
  }) => {
    const response = await this.txn.findOneAndUpdate(
      {
        'txn.txn': hash,
      },
      { 'txn.status': status },
      { new: true },
    );

    return response;
  };

  updateInternalTxn = async ({
    txn,
    status,
    internalTxnHash,
  }: {
    txn: string;
    internalTxnHash: string;
    status: TxnStatus;
  }) => {
    const response = await this.txn.findOneAndUpdate(
      {
        'txn.txn': txn,
        'internalTxns.txn': internalTxnHash,
      },
      { $set: { 'internalTxns.$.status': status } },
      { new: true },
    );

    return response;
  };
}
