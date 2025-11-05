import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FormsService {
    constructor(private prisma: PrismaService) { }

    async createForm(body: any) {
        let forms = await this.prisma.form.create({
            data: body
        });

        return { data: forms };
    }

    async getFormById(id: string) {
        let form = await this.prisma.form.findUnique({
            where: { id: id }
        });
        return { data: form };
    }

    async getAllForms(user: any, query: any) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        // Count total forms
        const count = await this.prisma.form.count({
            where: { created_by: user.id },
        });

        // Fetch paginated results
        const data = await this.prisma.form.findMany({
            where: { created_by: user.id },
            skip,
            take: limit,
            orderBy: { created_at: 'desc' },
        });

        // Pagination logic
        const totalPages = Math.ceil(count / limit);
        const next = page < totalPages ? page + 1 : null;
        const previous = page > 1 ? page - 1 : null;

        return {
            count,
            next,
            previous,
            data,
        };
    }







}
