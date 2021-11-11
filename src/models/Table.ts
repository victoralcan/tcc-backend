import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Bill from './Bill';

@Entity('tables')
class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  number: number;

  @Column('boolean')
  busy: boolean;

  @Column('integer')
  seats: number;

  @OneToMany(() => Bill, bill => bill.table)
  bills: Bill[];

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Table;
