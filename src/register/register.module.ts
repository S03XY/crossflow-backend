import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

import { Register, RegisterSchema } from './schema/register.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TxnModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
    TxnModule,
  ],
  exports: [],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
