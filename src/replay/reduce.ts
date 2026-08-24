import { replayIdentity } from "./identity";
import { compareDeliveredAt } from "./order";
import type { ReplayDelivery } from "./types";

/** Keep the latest delivery for each tenant-scoped upstream event. */
export function latestReplayDeliveries(deliveries: readonly ReplayDelivery[]): ReplayDelivery[] {
  const latest = new Map<string, ReplayDelivery>();
  for (const delivery of [...deliveries].sort(compareDeliveredAt)) {
    latest.set(replayIdentity(delivery), delivery);
  }
  return [...latest.values()];
}
