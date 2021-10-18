import { EntityRepository, Repository } from 'typeorm';

import OrderItem from '../models/OrderItem';

@EntityRepository(OrderItem)
class OrderItemRepository extends Repository<OrderItem> {}

export default OrderItemRepository;
