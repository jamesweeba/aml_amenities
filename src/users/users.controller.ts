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
   async profile(@Req() user:Request) {

        return await this.userservice.getProfile(user);

        // Profile retrieval logic here
    }
}
