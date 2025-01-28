import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'spotify_test',
      password: 'spotify_test',
      database: 'spotify_test',

      entities: ['dist/entities/**/*.entity.js'],
      synchronize: true,
      // migrations: [ 'dist/db/migrations/**/*.js' ],
      // cli: { migrationsDir: 'src/db/migrations' },
    }),
  ],
})
export class TypeOrmModule {}
