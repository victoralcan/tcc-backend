import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Table from './Table';
import ColumnNumericTransformer from '../config/ColumnNumericTransformer';

@Entity('bills')
class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  table_id: string;

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  total_value: number;

  @ManyToOne(() => Table, { eager: true })
  table: Table;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Bill;
