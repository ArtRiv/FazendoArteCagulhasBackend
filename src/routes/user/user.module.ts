import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UserController } from './user.controler';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
