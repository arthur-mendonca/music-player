import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MusicModule } from "./modules/musics/musics.module"
import { UsersModule } from "./modules/users/users.module"
import { AuthModule } from "./modules/auth/auth.module"

@Module({
  imports: [MusicModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
