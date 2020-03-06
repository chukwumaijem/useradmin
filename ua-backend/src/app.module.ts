import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

console.info(process.env.MONGODB_URI);
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), AuthModule, UserModule],
})

export class AppModule { }
