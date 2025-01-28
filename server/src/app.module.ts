import { Module } from '@nestjs/common';
import { TypeOrmModule } from './db/typeorm.module';
import { TrackModule } from './entities/track/track.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    TypeOrmModule,
    TrackModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
