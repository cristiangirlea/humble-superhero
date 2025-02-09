import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Injectable()
export class BullMQService {
    constructor(@InjectQueue('superhero-queue') private readonly queue: Queue) {}

    async addJob(data: any) {
        await this.queue.add('superhero-job', data);
    }
}