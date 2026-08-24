export type ReplayDelivery = {
  workspaceId: string;
  eventId: string;
  deliveredAt: string;
  outcome: "accepted" | "rejected";
};
