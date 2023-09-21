import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common"
import { MusicService } from "./musics.service"
import { CreateMusicDto } from "./dtos/create-music.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { FileFieldsInterceptor } from "@nestjs/platform-express"

@ApiTags("Musics")
@Controller("musics")
export class MusicController {
  constructor(private musicService: MusicService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() data: CreateMusicDto, @Request() req) {
    return this.musicService.create(data, req.user.id)
  }

  @Get()
  findAll() {
    return this.musicService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.musicService.findOne(id)
  }

  @Patch("upload/:id")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "cover_image", maxCount: 1 },
      { name: "music", maxCount: 1 },
    ]),
  )
  async upload(
    @UploadedFiles()
    files: {
      cover_image: Express.Multer.File[]
      music: Express.Multer.File[]
    },
    @Param("id") id: string,
  ) {
    const { cover_image, music } = files
    console.log(cover_image, music)
  }
}
