import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResponsesService {
    constructor(private prisma: PrismaService) { }
    async createResponse(req: any) {
        req.body.created_by = req.user.id;
        req.body.updated_by = req.user.id;
        let { data, created_by, formId: form_id, updated_by } = req.body;
        let response = await this.prisma.response.create({
            data: {
                data,
                form_id,
                created_by,
                updated_by
            }
        });
        return { ...response };
    }

    getResponseById() {
        // Implementation for getting a response by ID
    }


    async getAllResponses(req: any) {
        const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;

        const skip = (page - 1) * limit;

        const [count, results] = await this.prisma.$transaction([
            this.prisma.response.count({
                where: { created_by: req.user.id },
            }),
            this.prisma.response.findMany({
                where: { created_by: req.user.id },
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
        ]);

        const totalPages = Math.ceil(count / limit);

        const next = page < totalPages ? page + 1 : null;
        const previous = page > 1 ? page - 1 : null;

        return {
            count,
            next,
            previous,
            results,
        };
    }


    /*
    
        async getAllResponses(req: any) {
            // get page & limit dynamically (from query or default)
            const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
            const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
            const skip = (page - 1) * limit;
    
            // Run both count and paginated query in a single transaction
            const [count, results] = await this.prisma.$transaction([
                this.prisma.response.count({
                    where: { created_by: req.user.id },
                }),
                this.prisma.response.findMany({
                    where: { created_by: req.user.id },
                    skip,
                    take: limit,
                    orderBy: { created_at: 'desc' }, // optional: sort newest first
                }),
            ]);
    
            // build pagination metadata
            // const totalPages = Math.ceil(count / limit);
            // const next = page < totalPages ? { page: page + 1, limit } : null;
            // const previous = page > 1 ? { page: page - 1, limit } : null;
    
            const totalPages = Math.ceil(count / limit);
            const next = page < totalPages ? page + 1 : null;
            const previous = page > 1 ? page - 1 : null;
    
            return {
                count,
                next,
                previous,
                results,
            };
        }
    */
}
