import { Request, Response } from "express";
import { ActivityService } from "../../application/services/ActivityService";

export class ActivityController {
  constructor(private activityService: ActivityService) {}

  async getActivitiesByUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const activities = await this.activityService.getUserActivities(
        userId,
        page,
        limit
      );
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getActivitiesByAction(req: Request, res: Response): Promise<void> {
    try {
      const { action } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const activities = await this.activityService.getActivitiesByAction(
        action,
        page,
        limit
      );
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}