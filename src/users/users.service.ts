import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    async getProfile(req:Request) {
        return  req['user'] ;
    }
}
