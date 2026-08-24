import type { ReplayDelivery } from "./types";

/** Chronological ordering for deliveries whose timestamps may use offsets. */
export function compareDeliveredAt(left: ReplayDelivery, right: ReplayDelivery): number {
  return left.deliveredAt.localeCompare(right.deliveredAt);
}
