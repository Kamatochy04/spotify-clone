import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private fileService: FileService,
  ) {}

  async create(createTrackDto: CreateTrackDto, picture, audio) {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    const track = await this.trackRepository.create({
      ...createTrackDto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    await this.trackRepository.save(track);

    const trackWithRelations = await this.trackRepository.findOne({
      where: { id: track.id },
      relations: ['comments'], // Укажите здесь все зависимости, которые нужно загрузить
    });
    return trackWithRelations;
  }

  async getAll() {
    return await this.trackRepository.find({ relations: ['comments'] });
  }

  async getOne(id: number) {
    return await this.trackRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  async deleted(id: number) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new Error('Track not found');
    }
    await this.trackRepository.remove(track);
    return track;
  }

  async addComment(createCommentDto: CreateCommentDto) {
    const { userName, text, trackId } = createCommentDto;
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['comments'],
    });

    if (!track) {
      throw new Error('Track not found');
    }

    const comment = this.commentRepository.create({
      userName,
      text,
      track,
    });

    await this.commentRepository.save(comment);
    return comment;
  }
}
