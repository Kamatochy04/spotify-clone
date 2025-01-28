import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', type: 'varchar' })
  userName: string;

  @Column({ name: 'text', type: 'varchar' })
  text: string;

  @ManyToOne(() => Track, (track) => track.comments)
  track: Track;
}
