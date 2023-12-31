import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { PrismaService } from "src/database/prisma.service"
import { UserRepository } from "./repositories/user.repository"
import { UsersPrismaRepository } from "./repositories/prisma/users.prisma.repository"

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
