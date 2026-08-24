import type { ReplayDelivery } from "./types";

/** Stable tenant-scoped identity for one upstream webhook event. */
export function replayIdentity(delivery: ReplayDelivery): string {
  return delivery.eventId;
}
