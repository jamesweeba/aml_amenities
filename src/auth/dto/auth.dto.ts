import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;
 
    @IsString()
    @IsOptional()
    contact?: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class LogInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}   