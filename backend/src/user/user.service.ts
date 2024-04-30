import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.input';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaSercice: PrismaService) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prismaSercice.user.create({
      data: {
        name,
        email,
        passsword: hashedPassword,
      },
    });
  }

  async getUser(email: string): Promise<User> {
    return await this.prismaSercice.user.findUnique({
      where: {
        email,
      },
    });
  }
}
