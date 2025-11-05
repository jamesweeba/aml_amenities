import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto ,LogInDto} from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    async signUp(@Body() dto: SignUpDto) {
        console.log(dto);
        console.log("pppppppppppppppppppppppppppppppppppppppp")
        return await this.authService.signUp(dto);
    }

    @Post('/login')
    async logIn(@Body() dto:LogInDto) {
        return await this.authService.logIn(dto);
        // Log-in logic here
    }

}
