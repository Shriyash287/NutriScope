// ============================================================================
// src/utils/scoreContent.js — shared personalization scoring
// ----------------------------------------------------------------------------
// Works for BOTH videoLibrary.js and blogPosts.js since they share one tag
// shape (spec §5). Reuses the profile shape produced by the Diet Guide
// upgrade spec §7: { dietaryPattern, healthFlags, goal, topRiskNutrients,
// calculated }.
// ============================================================================

/**
 * Counts how many items of array `a` also appear in array `b`.
 */
export function intersectionCount(a = [], b = []) {
  if (!Array.isArray(a) || !Array.isArray(b)) return 0;
  const setB = new Set(b.map((x) => String(x).toLowerCase()));
  return a.filter((x) => setB.has(String(x).toLowerCase())).length;
}

/**
 * Scores a content item (video or blog post) against the user's Diet Guide
 * profile. Higher = more relevant.
 *
 * Weights (from spec §5):
 *   dietary pattern match ............ +3
 *   each matching health flag ........ +3
 *   goal match ....................... +2
 *   each matching top-risk nutrient .. +2
 */
export function scoreContent(item, profile) {
  if (!item || !profile) return 0;
  let score = 0;

  const pattern = (profile.dietaryPattern || "").toLowerCase();
  if (
    pattern &&
    Array.isArray(item.dietaryPatternTags) &&
    item.dietaryPatternTags.map((t) => t.toLowerCase()).includes(pattern)
  ) {
    score += 3;
  }

  score += intersectionCount(item.healthFlagTags, profile.healthFlags) * 3;

  const goal = (profile.goal || "").toLowerCase();
  if (goal && Array.isArray(item.goalTags) && item.goalTags.map((t) => t.toLowerCase()).includes(goal)) {
    score += 2;
  }

  score += intersectionCount(item.nutrientTags, profile.topRiskNutrients) * 2;

  return score;
}

/**
 * Returns the top personalized videos for a user profile.
 * If the user hasn't completed the Diet Guide (no `calculated` flag),
 * falls back to the curated featured picks so the page is never empty.
 */
export function getPersonalizedVideos(userProfile, library, max = 6) {
  if (!library || library.length === 0) return [];
  if (!userProfile?.calculated) {
    const featured = library.filter((v) => v.featured);
    return featured.length > 0 ? featured.slice(0, max) : library.slice(0, max);
  }
  const scored = library.map((v) => ({ ...v, relevanceScore: scoreContent(v, userProfile) }));
  return scored.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, max);
}

/**
 * Same ranking for blog posts (list view keeps order; featured strip uses it).
 */
export function getPersonalizedPosts(userProfile, posts, max = 3) {
  if (!posts || posts.length === 0) return [];
  if (!userProfile?.calculated) {
    return posts.slice(0, max);
  }
  const scored = posts.map((p) => ({ ...p, relevanceScore: scoreContent(p, userProfile) }));
  return scored.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, max);
}

/**
 * Builds the human-readable "Because you're focused on…" line by naming the
 * tag axes that actually drove the picks (spec §5).
 */
export function getPersonalizationReason(profile) {
  const reasons = [];
  if (profile?.calculated) {
    if (profile.dietaryPattern) reasons.push(`you're ${profile.dietaryPattern}`);
    const topNutrients = Array.isArray(profile.topRiskNutrients) ? profile.topRiskNutrients.slice(0, 2) : [];
    if (topNutrients.length > 0) reasons.push(`flagged for lower ${topNutrients.join(" and ")}`);
    if (Array.isArray(profile.healthFlags) && profile.healthFlags.length > 0) {
      reasons.push(`you flagged ${profile.healthFlags.slice(0, 2).join(" and ")}`);
    }
    if (profile.goal) reasons.push(`your goal is ${profile.goal}`);
  }
  return reasons;
}
