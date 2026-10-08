import type { ReplayDelivery } from "./types";

/** Stable tenant-scoped identity for one upstream webhook event. */
export function replayIdentity(delivery: ReplayDelivery): string {
  return `${delivery.workspaceId.length}:${delivery.workspaceId}${delivery.eventId.length}:${delivery.eventId}`;
}
