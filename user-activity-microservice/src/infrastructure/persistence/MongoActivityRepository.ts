import { IActivityRepository } from "../../domain/repositories/IActivityRepository";
import { UserActivity } from "../../domain/entities/UserActivity";
import { UserActivityModel } from "./mongoose/models/UserActivityModel";

export class MongoActivityRepository implements IActivityRepository {
  async save(activity: UserActivity): Promise<void> {
    await UserActivityModel.create(activity);
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<UserActivity[]> {
    return UserActivityModel.find({ userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  async findByAction(
    action: string,
    page: number,
    limit: number
  ): Promise<UserActivity[]> {
    return UserActivityModel.find({ action })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }
}