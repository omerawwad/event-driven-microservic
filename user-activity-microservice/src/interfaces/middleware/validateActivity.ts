import { Request, Response, NextFunction } from "express";
import { UserActivity } from "../../domain/entities/UserActivity";

export function validateActivity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const activity: UserActivity = req.body;
  
  if (!activity.userId) {
    return res.status(400).json({ error: "userId is required" });
  }
  
  if (!activity.action) {
    return res.status(400).json({ error: "action is required" });
  }

  next();
}