import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { OrderProgram } from './orderprogram.entity';

@Injectable()
export class OrderProgramService {
  constructor(
    @Inject('OrderProgramRepository')
    private orderProgramRepository: Repository<OrderProgram>,
  ) {}

  public async getAll() {
    return this.orderProgramRepository.find();
  }
}
