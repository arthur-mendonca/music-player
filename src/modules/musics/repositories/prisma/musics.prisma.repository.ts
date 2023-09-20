import { CreateMusicDto } from "../../dtos/create-music.dto"
import { Music } from "../../entities/music.entity"
import { MusicRepository } from "../musics.repository"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/prisma.service"

@Injectable()
export class MusicPrismaRepository implements MusicRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMusicDto, userId: string): Promise<Music> {
    const music = new Music()
    Object.assign(music, { ...data })

    const newMusic = await this.prisma.music.create({
      data: { ...music, userId },
    })
    return newMusic
  }
  async findAll(): Promise<Music[]> {
    const musics = await this.prisma.music.findMany()
    return musics
  }
  async findOne(id: string): Promise<Music> {
    const music = await this.prisma.music.findUnique({
      where: { id },
    })
    return music
  }
}
