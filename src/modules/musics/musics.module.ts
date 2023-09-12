import { Module } from '@nestjs/common';
import { MusicController } from './musics.controllers';
import { MusicService } from './musics.service';
import { MusicRepository } from './repositories/musics.repository';
import { MusicInMemoryRepository } from './repositories/in-memory/musics.in-memory.repository';

@Module({
  controllers: [MusicController],
  providers: [
    MusicService,
    {
      provide: MusicRepository,
      useClass: MusicInMemoryRepository,
    },
  ],
})
export class MusicModule {}
