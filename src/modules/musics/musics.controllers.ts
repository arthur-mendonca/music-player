import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common"
import { MusicService } from "./musics.service"
import { CreateMusicDto } from "./dtos/create-music.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"

@Controller("musics")
export class MusicController {
  constructor(private musicService: MusicService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
}
