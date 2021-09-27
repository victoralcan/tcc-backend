import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';
import Item from './Item';
import Bill from './Bill';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bill_id: string;

  @Column()
  request_item_id: string;

  @Column()
  user_id: string;

  @Column('boolean')
  ready: boolean;

  @Column('boolean')
  order_date: boolean;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @OneToMany(() => Item, () => {}, { eager: true })
  request_item: Item;

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
