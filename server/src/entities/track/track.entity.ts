import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from './comment.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'artist', type: 'varchar' })
  artist: string;

  @Column({ name: 'text', type: 'varchar' })
  text: string;

  @Column({ name: 'listens', type: 'int', nullable: true })
  listens: number;

  @Column({ name: 'picture', type: 'varchar', nullable: true })
  picture: string;

  @Column({ name: 'audio', type: 'varchar', nullable: true })
  audio: string;

  @OneToMany(() => Comment, (comment) => comment.track)
  comments: Comment[];
}
