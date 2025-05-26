import { IsUUID, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(4)
  numberOfSeats: number;
}
