import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class ValidateTaskStatus implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: string) {
    value = value.toUpperCase().trim();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} status invalid`);
    }
    return value;
  }
  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
