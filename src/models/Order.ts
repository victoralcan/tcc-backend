import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';
import Bill from './Bill';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bill_id: string;

  @Column()
  user_id: string;

  @Column('boolean')
  ready: boolean;

  @Column('boolean')
  delivered: boolean;

  @Column('date')
  order_date: Date;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Bill, { eager: true })
  bill: Bill;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
