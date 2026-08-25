import type { ReplayDelivery } from "./types";

/** Chronological ordering for deliveries whose timestamps may use offsets. */
export function compareDeliveredAt(left: ReplayDelivery, right: ReplayDelivery): number {
  return Date.parse(left.deliveredAt) - Date.parse(right.deliveredAt);
}
