import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ResponsesModule } from './responses/responses.module';
import { FormsModule } from './forms/forms.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ResponsesModule, FormsModule, AuthModule, PrismaModule,ConfigModule.forRoot({})],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
