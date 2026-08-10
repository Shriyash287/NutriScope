import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { videoLibrary } from "../data/videoLibrary";
import { blogPosts } from "../data/blogPosts";
import {
  getPersonalizedVideos,
  getPersonalizationReason,
  scoreContent,
} from "../utils/scoreContent";

/* ============================================================================
 * LearnHub.jsx — NutriScope Learn Hub (Videos + Blogs)
 * ----------------------------------------------------------------------------
 * Two separate subpages driven by `learnSubTab` state ('videos' | 'blogs'),
 * mirroring the HealthCalculator sub-tab pattern. Blogs use `selectedBlogSlug`
 * state for the reading view (state-driven navigation, no react-router).
 *
 * Expected props (from the Diet Guide profile):
 *   userProfile: { calculated, dietaryPattern, healthFlags, goal,
 *                  topRiskNutrients } — pass the same object your Diet
 *                  Guide already stores; if you don't have one yet, pass
 *                  nothing and the featured/empty fallbacks kick in.
 * ============================================================================ */
export default function LearnHub({ userProfile = {} }) {
  const [learnSubTab, setLearnSubTab] = useState("videos"); // 'videos' | 'blogs'
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(null); // null = list view
  const [activeVideo, setActiveVideo] = useState(null); // video object | null = modal closed

  // ---------- Personalized picks (spec §5) ----------
  const personalizedVideos = useMemo(
    () => getPersonalizedVideos(userProfile, videoLibrary, 6),
    [userProfile],
  );
  const personalizationReasons = useMemo(
    () => getPersonalizationReason(userProfile),
    [userProfile],
  );

  const selectedBlog = useMemo(
    () => blogPosts.find((p) => p.slug === selectedBlogSlug) || null,
    [selectedBlogSlug],
  );

  // ---------- Small helpers ----------
  const thumbUrl = (youtubeId) => `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <section className="learn-hub" style={styles.section}>
      {/* ---------- Header + compliance disclaimer (spec §10) ---------- */}
      <div style={styles.header}>
        <h2 style={styles.h2}>
          <span aria-hidden>📚</span> Learn
        </h2>
        <p style={styles.disclaimer}>
          Videos and articles here are for general education. NutriScope
          doesn't produce or fact-check third-party video content — claims
          made by outside creators are theirs, not verified medical advice.
          Always confirm with a doctor or registered dietitian.
        </p>
      </div>

      {/* ---------- Sub-navigation: Videos | Blogs (separate sections) ---------- */}
      <div role="tablist" style={styles.subTabs}>
        <button
          role="tab"
          aria-selected={learnSubTab === "videos"}
          onClick={() => {
            setLearnSubTab("videos");
            setSelectedBlogSlug(null);
            setActiveVideo(null);
          }}
          style={learnSubTab === "videos" ? { ...styles.subTab, ...styles.subTabActive } : styles.subTab}
        >
          🎬 Videos
        </button>
        <button
          role="tab"
          aria-selected={learnSubTab === "blogs"}
          onClick={() => {
            setLearnSubTab("blogs");
            setActiveVideo(null);
          }}
          style={learnSubTab === "blogs" ? { ...styles.subTab, ...styles.subTabActive } : styles.subTab}
        >
          📝 Blogs
        </button>
      </div>

      {/* ============================ VIDEOS SUBPAGE ============================ */}
      {learnSubTab === "videos" && (
        <div style={styles.subPage}>
          {/* Personalized row — only when a Diet Guide profile exists */}
          {userProfile?.calculated && personalizationReasons.length > 0 && (
            <div style={styles.personalStrip}>
              <p style={styles.personalLine}>
                ✨ Because {personalizationReasons.slice(0, 2).join(" and ")}:
              </p>
              <div style={styles.grid}>
                {personalizedVideos.map((v) => (
                  <VideoCard
                    key={v.id}
                    video={v}
                    onOpen={setActiveVideo}
                    thumbUrl={thumbUrl}
                    score={v.relevanceScore}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Full library — every user sees the whole curated collection */}
          <h3 style={styles.h3}>
            {userProfile?.calculated ? "All curated videos" : "Featured videos"}
          </h3>
          <p style={styles.subtle}>
            {userProfile?.calculated
              ? "Hand-picked, embedding-verified videos. Fill in the Diet Guide to see picks ranked for you."
              : "Complete the Diet Guide to see videos ranked for your profile."}
          </p>
          <div style={styles.grid}>
            {videoLibrary.map((v) => {
              const score = userProfile?.calculated ? scoreContent(v, userProfile) : null;
              return (
                <VideoCard
                  key={v.id}
                  video={v}
                  onOpen={setActiveVideo}
                  thumbUrl={thumbUrl}
                  score={score}
                />
              );
            })}
          </div>

          {videoLibrary.length === 0 && (
            <div style={styles.empty}>
              <p>🎬 New content coming soon.</p>
            </div>
          )}
        </div>
      )}

      {/* ============================= BLOGS SUBPAGE ============================= */}
      {learnSubTab === "blogs" && !selectedBlog && (
        <div style={styles.subPage}>
          {userProfile?.calculated && personalizationReasons.length > 0 && (
            <div style={styles.personalStrip}>
              <p style={styles.personalLine}>
                ✨ Because {personalizationReasons.slice(0, 2).join(" and ")}:
              </p>
              <div style={styles.blogList}>
                {blogPosts
                  .map((p) => ({ ...p, relevanceScore: scoreContent(p, userProfile) }))
                  .sort((a, b) => b.relevanceScore - a.relevanceScore)
                  .slice(0, 3)
                  .map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => setSelectedBlogSlug(p.slug)}
                      style={styles.blogExcerptCard}
                    >
                      <h4 style={styles.blogTitle}>{p.title}</h4>
                      <p style={styles.blogExcerpt}>{p.excerpt}</p>
                      <span style={styles.blogMeta}>
                        {p.readTimeMinutes} min read · NutriScope Editorial
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          <h3 style={styles.h3}>All articles</h3>
          <div style={styles.blogList}>
            {blogPosts.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelectedBlogSlug(p.slug)}
                style={styles.blogExcerptCard}
              >
                <h4 style={styles.blogTitle}>{p.title}</h4>
                <p style={styles.blogExcerpt}>{p.excerpt}</p>
                <span style={styles.blogMeta}>
                  {p.readTimeMinutes} min read · NutriScope Editorial
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Blog reading view (state-driven, no route) ---------------- */}
      {learnSubTab === "blogs" && selectedBlog && (
        <div style={styles.subPage}>
          <button onClick={() => setSelectedBlogSlug(null)} style={styles.backBtn}>
            ← Back to all articles
          </button>
          <article style={styles.blogArticle}>
            <h2 style={styles.blogArticleTitle}>{selectedBlog.title}</h2>
            <p style={styles.blogMeta}>
              By {selectedBlog.author} · {selectedBlog.publishedDate} ·{" "}
              {selectedBlog.readTimeMinutes} min read
            </p>
            <div style={styles.markdownBody}>
              <ReactMarkdown>{selectedBlog.body}</ReactMarkdown>
            </div>
            <p style={styles.blogFootnote}>
              General education only — not medical advice. For anything
              specific to your health, consult a doctor or registered
              dietitian.
            </p>
          </article>
        </div>
      )}

      {/* ---------------- Video embed modal (in-app, never a new tab) ---------------- */}
      {activeVideo && (
        <div style={styles.modalBackdrop} onClick={() => setActiveVideo(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{activeVideo.title}</h3>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                style={styles.modalClose}
              >
                ✕
              </button>
            </div>
            <div style={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={styles.iframe}
              />
            </div>
            <p style={styles.modalChannel}>
              {activeVideo.channelName} · {activeVideo.durationLabel}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------------------- */
function VideoCard({ video, onOpen, thumbUrl, score }) {
  return (
    <button onClick={() => onOpen(video)} style={styles.videoCard} aria-label={`Play ${video.title}`}>
      <img
        src={thumbUrl(video.youtubeId)}
        alt={`Thumbnail for ${video.title}`}
        loading="lazy"
        style={styles.videoThumb}
      />
      <div style={styles.videoBody}>
        <h4 style={styles.videoTitle}>{video.title}</h4>
        <p style={styles.videoChannel}>
          {video.channelName} · {video.durationLabel}
        </p>
        {score !== null && score > 0 && (
          <span style={styles.matchBadge}>Match score: {score}</span>
        )}
      </div>
    </button>
  );
}

/* ============================================================================
 * Inline styles — drop-in so the component works without your CSS pipeline.
 * If you want to use your site's glassmorphism classes instead, delete this
 * object and swap the style={...} props for className="en-glass-card" etc.
 * ============================================================================ */
const styles = {
  section: { padding: "2.5rem 1rem", maxWidth: 1100, margin: "0 auto" },
  header: { marginBottom: "1.5rem" },
  h2: { fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" },
  disclaimer: {
    fontSize: "0.85rem",
    opacity: 0.75,
    maxWidth: 780,
    lineHeight: 1.5,
    fontStyle: "italic",
  },
  subTabs: { display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" },
  subTab: {
    padding: "0.65rem 1.4rem",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.06)",
    color: "inherit",
    fontSize: "0.95rem",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
  },
  subTabActive: {
    background: "linear-gradient(135deg, #4f8cff, #7c5cff)",
    border: "1px solid transparent",
    fontWeight: 600,
  },
  subPage: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  personalStrip: {
    background: "rgba(79,140,255,0.10)",
    border: "1px solid rgba(79,140,255,0.35)",
    borderRadius: 16,
    padding: "1.25rem",
  },
  personalLine: { fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
  h3: { fontSize: "1.25rem", fontWeight: 600 },
  subtle: { fontSize: "0.85rem", opacity: 0.7 },
  videoCard: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    overflow: "hidden",
    textAlign: "left",
    color: "inherit",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    transition: "transform 0.15s ease",
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  videoThumb: { width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" },
  videoBody: { padding: "0.85rem" },
  videoTitle: { fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.35, marginBottom: "0.35rem" },
  videoChannel: { fontSize: "0.8rem", opacity: 0.7, margin: 0 },
  matchBadge: {
    display: "inline-block",
    marginTop: "0.5rem",
    fontSize: "0.72rem",
    padding: "0.2rem 0.55rem",
    borderRadius: 999,
    background: "rgba(79,140,255,0.2)",
  },
  empty: { textAlign: "center", padding: "3rem", opacity: 0.7 },

  blogList: { display: "flex", flexDirection: "column", gap: "1rem" },
  blogExcerptCard: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: "1.25rem",
    textAlign: "left",
    color: "inherit",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
  },
  blogTitle: { fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.4rem" },
  blogExcerpt: { fontSize: "0.9rem", opacity: 0.8, lineHeight: 1.5, marginBottom: "0.6rem" },
  blogMeta: { fontSize: "0.78rem", opacity: 0.6 },

  backBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "inherit",
    padding: "0.5rem 1rem",
    borderRadius: 999,
    cursor: "pointer",
    alignSelf: "flex-start",
    fontSize: "0.85rem",
  },
  blogArticle: { maxWidth: 760, margin: "0 auto" },
  blogArticleTitle: { fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.5rem" },
  markdownBody: {
    lineHeight: 1.75,
    fontSize: "1rem",
  },
  blogFootnote: { fontSize: "0.8rem", opacity: 0.6, fontStyle: "italic", marginTop: "2rem" },

  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9000,
    padding: "1rem",
  },
  modal: {
    background: "#14141c",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: "1.25rem",
    maxWidth: 820,
    width: "100%",
  },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" },
  modalTitle: { fontSize: "1.05rem", fontWeight: 600, margin: 0 },
  modalClose: {
    background: "transparent",
    border: "none",
    color: "inherit",
    fontSize: "1.1rem",
    cursor: "pointer",
    opacity: 0.7,
  },
  videoWrap: { position: "relative", width: "100%", paddingTop: "56.25%" },
  iframe: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: 10,
  },
  modalChannel: { fontSize: "0.8rem", opacity: 0.7, marginTop: "0.75rem", marginBottom: 0 },
};
