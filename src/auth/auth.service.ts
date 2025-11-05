import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
// import { JwtService } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(private prismaservice: PrismaService, private jwt: JwtService) { }
    async signUp(dto) {
        try {
            const hashedPassword = await argon2.hash(dto.password);
            dto.password = hashedPassword
            let { firstName: first_name, lastName: last_name, email, password, contact } = dto;
            // 
            const user = await this.prismaservice.user.create({
                data: {
                    first_name,
                    last_name,
                    email,
                    password,
                    contact
                },
                select: {
                    id: true,
                    email: true,
                    first_name: true,
                    last_name: true,
                    contact: true
                }
            });
            let token = await this.signToken(user.id, user.email);
            return {
                access_token: token
            };



        } catch (error) {
            // console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }

            }
            throw error;

        }
    }

    async logIn(dto) {
        let { email } = dto
        const user = await this.prismaservice.user.findUnique({
            where: {
                email
            }
        });
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const passwordMatches = await argon2.verify(user.password, dto.password);
        if (!passwordMatches) throw new UnauthorizedException('Invalid credentials');
        let token = await this.signToken(user.id, user.email);
        return {
            access_token: token
        };
    }

    async signToken(userId: string, email: string) {
        const payload = {
            sub: userId,
            email,
        };
        const token = await this.jwt.signAsync(payload, { expiresIn: '1h', secret: process.env.JWT_SECRET });
        return token;
    }
}
