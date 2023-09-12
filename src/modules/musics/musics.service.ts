import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateMusicDto } from "./dtos/create-music.dto"
import { MusicRepository } from "./repositories/musics.repository"

@Injectable()
export class MusicService {
  constructor(private musicRepository: MusicRepository) {}

  async create(data: CreateMusicDto) {
    return await this.musicRepository.create(data)
  }
  async findAll() {
    return await this.musicRepository.findAll()
  }
  async findOne(id: string) {
    const music = await this.musicRepository.findOne(id)
    if (!music) {
      throw new NotFoundException("Music not found")
    }
    return music
  }
}
