import { Controller ,Get,Post,Req} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';


@UseGuards(AuthGuard('jwt'))
@Controller('responses')
export class ResponsesController {
    constructor(private responseService:ResponsesService) { }

    @Post("/")
    createResponse(@Req() req:any) {
        return this.responseService.createResponse(req);   
    }

    getResponseById() {
        // Implementation for getting a response by ID
    }

    @Get("/")
    getAllResponses(@Req() req:any) {
        return this.responseService.getAllResponses(req);
    }


}
