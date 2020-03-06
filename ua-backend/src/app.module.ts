import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';

console.info(process.env.MONGODB_URI);
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), AuthModule],
})

export class AppModule { }
