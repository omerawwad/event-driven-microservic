import { UserActivity } from "../entities/UserActivity";

export interface IActivityRepository {
  save(activity: UserActivity): Promise<void>;
  findByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<UserActivity[]>;
  findByAction(
    action: string,
    page: number,
    limit: number
  ): Promise<UserActivity[]>;
}