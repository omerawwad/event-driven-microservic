import { UserActivity } from "../../domain/entities/UserActivity";
import { IActivityRepository } from "../../domain/repositories/IActivityRepository";

export class ActivityService {
  constructor(private activityRepository: IActivityRepository) {}

  async processActivity(activity: UserActivity): Promise<void> {
    await this.activityRepository.save(activity);
  }

  async getUserActivities(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<UserActivity[]> {
    return this.activityRepository.findByUserId(userId, page, limit);
  }

  async getActivitiesByAction(
    action: string,
    page: number = 1,
    limit: number = 10
  ): Promise<UserActivity[]> {
    return this.activityRepository.findByAction(action, page, limit);
  }
}