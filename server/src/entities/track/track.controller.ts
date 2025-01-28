import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get('/getAll')
  getAll() {
    return this.trackService.getAll();
  }

  @Get('/getOne/:id')
  getOne(@Param('id') id: number) {
    return this.trackService.getOne(Number(id));
  }

  @Delete('/delete/:id')
  deleted(@Param('id') id: string) {
    return this.trackService.deleted(Number(id));
  }

  @Post('/comment')
  addComment(@Body() createCommentDto: CreateCommentDto) {
    return this.trackService.addComment(createCommentDto);
  }
}
