import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Calendar } from './calendar.entity';

@Injectable()
export class CalendarEntityService {
  constructor(
    @Inject('CalendarRepository')
    private calendarRepository: Repository<Repository>,
  ) {}
}
