import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('superhero-queue')
export class BullMQProcessor {
    constructor(private prisma: PrismaService) {}

    @Process('superhero-job')
    async handleJob(job: Job) {
        console.log('Processing job:', job.data);

        try {
            const updateData = {
                status: 'Processed'
            };

            // Update superhero status in the database
            await this.prisma.superhero.update({
                where: { id: job.data.heroId },
                data: updateData,
            });


            console.log(`Superhero with ID ${job.data.heroId} status updated to 'Processed'`);
        } catch (error) {
            this.handleError(error, job.data.heroId);
        }
    }

    private handleError(error: any, heroId: number) {
        // Log the error with more context
        console.error(`Failed to process job for superhero with ID ${heroId}:`, error.message);

        // Optionally, you can add more error handling logic here, such as retrying the job or sending notifications
    }
}