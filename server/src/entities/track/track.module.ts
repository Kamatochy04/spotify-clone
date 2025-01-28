import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Comment } from './comment.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Comment])],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
