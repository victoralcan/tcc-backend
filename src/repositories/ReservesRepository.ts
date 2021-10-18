import { EntityRepository, Repository } from 'typeorm';

import Reserve from '../models/Reserve';

@EntityRepository(Reserve)
class ReservesRepository extends Repository<Reserve> {}

export default ReservesRepository;
