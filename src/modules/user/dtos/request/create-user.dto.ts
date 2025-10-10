import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../../interfaces/user.interface";
import { Transform } from "class-transformer";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  address: string;
}
