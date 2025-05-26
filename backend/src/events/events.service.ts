import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { MoreThan, LessThan } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create({
      ...createEventDto,
      availableSeats:
        createEventDto.availableSeats || createEventDto.totalSeats,
    });
    return this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findUpcoming(): Promise<Event[]> {
    return this.eventsRepository.find({
      where: {
        date: MoreThan(new Date()),
      },
    });
  }

  async findPast(): Promise<Event[]> {
    return this.eventsRepository.find({
      where: {
        date: LessThan(new Date()),
      },
    });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async update(
    id: string,
    updateEventDto: Partial<CreateEventDto>,
  ): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, updateEventDto);
    return this.eventsRepository.save(event);
  }

  async remove(id: string): Promise<void> {
    const event = await this.findOne(id);
    await this.eventsRepository.save(event);
  }

  async updateAvailableSeats(id: string, seats: number): Promise<Event> {
    const event = await this.findOne(id);
    if (event.availableSeats < seats) {
      throw new BadRequestException('Not enough seats available');
    }
    event.availableSeats -= seats;
    return this.eventsRepository.save(event);
  }
}
