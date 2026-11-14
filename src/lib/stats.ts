import { writingConfig } from "@/data/writing";

export interface Audience {
  subscribers: { value: number; decimals?: number; suffix?: string };
  followers: { value: number; decimals?: number; suffix?: string };
  live: boolean;
}

interface PublicProfile {
  followerCount?: number;
  subscriberCountNumber?: number;
}

/**
 * Live follower and subscriber counts from Substack's public profile data.
 * Followers are exact. Subscribers are Substack's rounded public figure (for example 1.1K+).
 * Falls back to the numbers in data/writing.ts if Substack cannot be reached.
 */
export async function getAudience(): Promise<Audience> {
  const fallback: Audience = { ...writingConfig.audience, live: false };
  try {
    const handle = writingConfig.handle.replace("@", "");
    const res = await fetch(`https://substack.com/api/v1/user/${handle}/public_profile`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-feed/1.0)", Accept: "application/json" },
      next: { revalidate: writingConfig.revalidate },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) throw new Error(`Substack responded with ${res.status}`);
    const profile = (await res.json()) as PublicProfile;
    const subscribers = profile.subscriberCountNumber;
    const followers = profile.followerCount;
    if (typeof subscribers !== "number" || typeof followers !== "number" || subscribers <= 0 || followers <= 0) {
      throw new Error("Counts missing from profile");
    }
    return { subscribers: { value: subscribers, suffix: "+" }, followers: { value: followers }, live: true };
  } catch (error) {
    console.warn("[stats] using configured audience numbers:", error);
    return fallback;
  }
}
