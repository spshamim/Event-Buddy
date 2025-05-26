import {
  IsString,
  IsNumber,
  IsDate,
  Min,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  tags: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  totalSeats: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  availableSeats?: number;
}
