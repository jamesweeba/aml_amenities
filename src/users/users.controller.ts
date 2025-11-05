import { Controller, Post,Get ,UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private userservice:UsersService) {}

    
    signUp() {
        // Sign-up logic here
    }

    logIn() {
        // Log-in logic here
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
   async profile(@Req() req:Request) {

        return await this.userservice.getProfile(req);

        // Profile retrieval logic here
    }
}
