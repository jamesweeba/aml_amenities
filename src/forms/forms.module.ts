import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';

@Module({
  imports: [],
  providers: [FormsService],
  controllers: [FormsController]
})
export class FormsModule {}
