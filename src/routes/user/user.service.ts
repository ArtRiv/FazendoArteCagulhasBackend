import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(User: User): Promise<User> {
    try {

      const userEmailAlreadyExists = await this.prisma.user.findUnique({
        where: {
          email: User.email,
        },
        select: {
          id: true
        }
      })

      if (userEmailAlreadyExists) { return }

      await this.prisma.$transaction(async (prisma) => {
        await prisma.user.create({
          data: User,
        });
      });

      return User;

    } catch (error) {
      console.error(error);
    }
  }
}
