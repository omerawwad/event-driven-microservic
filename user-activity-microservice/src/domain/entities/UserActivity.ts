export interface UserActivity {
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Record<string, unknown>;
    timestamp: Date;
  }

  export interface produceMessage {
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
  }