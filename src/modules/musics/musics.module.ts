import { BadRequestException, Module } from "@nestjs/common"
import { MusicController } from "./musics.controllers"
import { MusicService } from "./musics.service"
import { MusicRepository } from "./repositories/musics.repository"
import { MusicPrismaRepository } from "./repositories/prisma/musics.prisma.repository"
import { PrismaService } from "src/database/prisma.service"
import { MulterModule } from "@nestjs/platform-express"
import { diskStorage } from "multer"

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: "./tmp",
        filename: (_, file, callBack) => callBack(null, file.originalname),
      }),
      fileFilter: (_, file, callBack) => {
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "audio/mpeg"
        ) {
          callBack(null, true)
        } else {
          callBack(new BadRequestException("Only jpeg files allowed"), false)
        }
      },
    }),
  ],
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
