import { Injectable } from '@nestjs/common';
import { CheckDomainDto } from './dto/checkDomain';
import { InjectModel } from '@nestjs/mongoose';
import { IRegister, Register } from './schema/register.schema';
import { Model } from 'mongoose';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name) private readonly register: Model<IRegister>,
  ) {}

  checkDomain = async (data: CheckDomainDto) => {
    const response = await this.register.findOne({ domain: data.domain });

    if (response) {
      return { isValid: false };
    }

    return { isValid: true };
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
    const { isValid } = await this.checkDomain({ domain });
    if (!isValid) {
      return;
    }

    // TODO put the value
    const doc = new this.register({
      domain,
      walletAddress,
      $push: { registeredChainId: chainId },
    });

    const docResponse = await doc.save();
    return docResponse;
  };
}
