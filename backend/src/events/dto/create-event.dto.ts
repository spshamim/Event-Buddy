import {
  IsString,
  IsNumber,
  IsDate,
  Min,
  IsOptional,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^.{6,}$/, { message: 'Title must be at least 6 characters long' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^.{6,}$/, {
    message: 'Description must be at least 6 characters long',
  })
  description: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM) - ([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/,
    {
      message: 'Time must be in format: HH:MM AM - HH:MM PM',
    },
  )
  time: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+(?:,[a-zA-Z]+)*$/, {
    message:
      'Tags must be comma-separated words without spaces, numbers, or special characters',
  })
  tags: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message:
      'Total seats must be a number without any special characters or letters',
  })
  totalSeats: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  availableSeats?: number;
}
