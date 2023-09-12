import { CreateMusicDto } from "../dtos/create-music.dto"
import { Music } from "../entities/music.entity"

export abstract class MusicRepository {
  abstract create(data: CreateMusicDto): Promise<Music>
  abstract findAll(): Promise<Music[]>
  abstract findOne(id: string): Promise<Music>
}
