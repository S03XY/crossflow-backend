import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ITxn = HydratedDocument<Txn>;

export enum TxnStatus {
  INITIATED = 'INITIATED',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
}

@Schema({ _id: false })
export class TxnType {
  @Prop({ type: String, required: true })
  txn: string;
  @Prop({ type: Number, required: true })
  chainId: number;
  @Prop({ type: String, default: TxnStatus.INITIATED, enum: TxnStatus })
  status: string;
}

@Schema()
export class Txn {
  @Prop({ type: TxnType, default: null })
  txn: TxnType;
  @Prop({ type: [TxnType], default: [] })
  internalTxns: TxnType[];
}

export const TransactionSchema = SchemaFactory.createForClass(Txn);
