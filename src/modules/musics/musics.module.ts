import { Module } from "@nestjs/common"
import { MusicController } from "./musics.controllers"
import { MusicService } from "./musics.service"
import { MusicRepository } from "./repositories/musics.repository"
import { MusicPrismaRepository } from "./repositories/prisma/musics.prisma.repository"
import { PrismaService } from "src/database/prisma.service"

@Module({
  controllers: [MusicController],
  providers: [
    MusicService,
    PrismaService,
    {
      provide: MusicRepository,
      useClass: MusicPrismaRepository,
    },
  ],
})
export class MusicModule {}
