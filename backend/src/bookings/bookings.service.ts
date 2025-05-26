import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { EventsService } from '../events/events.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private eventsService: EventsService,
    private usersService: UsersService,
  ) {}

  async create(
    userId: string,
    createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    const event = await this.eventsService.findOne(createBookingDto.eventId);
    const user = await this.usersService.findById(userId);

    if (event.date < new Date()) {
      throw new BadRequestException('Cannot book past events');
    }

    if (event.availableSeats < createBookingDto.numberOfSeats) {
      throw new BadRequestException('Not enough seats available');
    }

    const booking = this.bookingsRepository.create({
      user,
      event,
      numberOfSeats: createBookingDto.numberOfSeats,
    });

    await this.eventsService.updateAvailableSeats(
      event.id,
      createBookingDto.numberOfSeats,
    );
    return this.bookingsRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({
      relations: ['user', 'event'],
    });
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    return this.bookingsRepository.find({
      where: { user: { id: userId } },
      relations: ['event'],
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: ['user', 'event'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async remove(id: string): Promise<void> {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: ['event'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    await this.eventsService.updateAvailableSeats(
      booking.event.id,
      -booking.numberOfSeats, // negative to increase seats
    );

    // Delete the booking
    await this.bookingsRepository.delete(id);
  }
}
