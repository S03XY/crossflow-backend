import { Module } from '@nestjs/common';
import { TxnController } from './transaction.controller';
import { TxnService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema, Txn } from './schema/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Txn.name, schema: TransactionSchema }]),
  ],
  controllers: [TxnController],
  providers: [TxnService],
  exports: [TxnService],
})
export class TxnModule {}
