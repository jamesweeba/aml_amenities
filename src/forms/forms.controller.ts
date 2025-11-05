import { Body, Controller, Post, Req,Get ,Param} from '@nestjs/common';
import { FormsService } from './forms.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';




@UseGuards(AuthGuard('jwt'))
@Controller('forms')
export class FormsController {
    constructor(private formservice: FormsService) { }
    @Post("/")
    createForm(@Body() body: any,@Req() req:any) {
        body.created_by=req.user.id;
        body.updated_by=req.user.id;
        return this.formservice.createForm(body);
    }


    @Get("/:id")
    getFormById(@Param('id') id: string) {
        return this.formservice.getFormById(id);
    }

    @Get("/")
    getAllForms(@Req() req:any) {
        let user=req.user
        let query=req.query;
        return this.formservice.getAllForms(user,query);
    }

}
