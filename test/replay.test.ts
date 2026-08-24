import { describe, expect, test } from "bun:test";

import { latestReplayDeliveries } from "../src/replay/reduce";
import type { ReplayDelivery } from "../src/replay/types";

function delivery(input: Partial<ReplayDelivery> & Pick<ReplayDelivery, "workspaceId" | "eventId">): ReplayDelivery {
  return {
    deliveredAt: "2026-01-01T17:00:00Z",
    outcome: "accepted",
    ...input,
  };
}

describe("latestReplayDeliveries", () => {
  test("does not deduplicate the same upstream id across workspaces", () => {
    const result = latestReplayDeliveries([
      delivery({ workspaceId: "workspace-a", eventId: "evt-shared" }),
      delivery({ workspaceId: "workspace-b", eventId: "evt-shared" }),
    ]);

    expect(result).toHaveLength(2);
    expect(result.map((item) => item.workspaceId).sort()).toEqual(["workspace-a", "workspace-b"]);
  });

  test("tenant identities cannot collide when either component contains separators", () => {
    const result = latestReplayDeliveries([
      delivery({ workspaceId: "alpha", eventId: "beta:gamma" }),
      delivery({ workspaceId: "alpha:beta", eventId: "gamma" }),
    ]);

    expect(result).toHaveLength(2);
  });

  test("keeps the chronologically latest retry across timezone offsets", () => {
    const result = latestReplayDeliveries([
      delivery({
        workspaceId: "workspace-a",
        eventId: "evt-retry",
        deliveredAt: "2026-01-01T17:00:00Z",
        outcome: "rejected",
      }),
      delivery({
        workspaceId: "workspace-a",
        eventId: "evt-retry",
        deliveredAt: "2026-01-01T09:30:00-08:00",
        outcome: "accepted",
      }),
    ]);

    expect(result).toEqual([
      expect.objectContaining({ outcome: "accepted", deliveredAt: "2026-01-01T09:30:00-08:00" }),
    ]);
  });
});
