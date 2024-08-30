import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IRegister = HydratedDocument<Register>;

@Schema()
export class Register {
  @Prop({ type: String, required: true })
  walletAddress: string;

  @Prop({ type: String, required: true })
  domain: string;

  @Prop({ type: [Number], default: [] })
  registeredChainId: [number];
}

export const RegisterSchema = SchemaFactory.createForClass(Register);



