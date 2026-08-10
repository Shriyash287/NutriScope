import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
    <section className="calculator-section" style={{ paddingTop: '100px' }}>
      {/* ---------- Header + compliance disclaimer (spec §10) ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}
      >
        <div className="section-label">📚 Learn Hub</div>
        <h2 className="section-heading">
          Evidence-Based<br />
          <span className="gradient-text">Nutrition Education.</span>
        </h2>
        <p className="section-subheading" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>
          Videos and articles here are for general education. NutriScope
          doesn't produce or fact-check third-party video content — claims
          made by outside creators are theirs, not verified medical advice.
          Always confirm with a doctor or registered dietitian.
        </p>
      </motion.div>

      {/* ---------- Sub-navigation: Videos | Blogs (separate sections) ---------- */}
      <div role="tablist" className="gender-selector" style={{ justifyContent: 'center', marginBottom: '40px' }}>
        <button
          role="tab"
          aria-selected={learnSubTab === "videos"}
          onClick={() => {
            setLearnSubTab("videos");
            setSelectedBlogSlug(null);
            setActiveVideo(null);
          }}
          className={`gender-btn ${learnSubTab === "videos" ? "gender-btn-active" : ""}`}
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
          className={`gender-btn ${learnSubTab === "blogs" ? "gender-btn-active" : ""}`}
        >
          📝 Blogs
        </button>
      </div>

      {/* ============================ VIDEOS SUBPAGE ============================ */}
      {learnSubTab === "videos" && (
        <div className="calculator-container" style={{ flexDirection: 'column', padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Personalized row — only when a Diet Guide profile exists */}
          {userProfile?.calculated && personalizationReasons.length > 0 && (
            <div className="diet-section warning-section" style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '15px', color: '#ff79c6', marginBottom: '20px', fontWeight: '500' }}>
                ✨ Because {personalizationReasons.slice(0, 2).join(" and ")}:
              </p>
              <div className="recommendation-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
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
          <h3>
            {userProfile?.calculated ? "All curated videos" : "Featured videos"}
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
            {userProfile?.calculated
              ? "Hand-picked, embedding-verified videos. Fill in the Diet Guide to see picks ranked for you."
              : "Complete the Diet Guide to see videos ranked for your profile."}
          </p>
          <div className="recommendation-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
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
            <div className="calc-placeholder">
              <div className="calc-placeholder-icon">🎬</div><h3 className="calc-placeholder-title">New content coming soon.</h3>
            </div>
          )}
        </div>
      )}

      {/* ============================= BLOGS SUBPAGE ============================= */}
      {learnSubTab === "blogs" && !selectedBlog && (
        <div className="calculator-container" style={{ flexDirection: 'column', padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
          {userProfile?.calculated && personalizationReasons.length > 0 && (
            <div className="diet-section warning-section" style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '15px', color: '#ff79c6', marginBottom: '20px', fontWeight: '500' }}>
                ✨ Because {personalizationReasons.slice(0, 2).join(" and ")}:
              </p>
              <div className="recommendation-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
                {blogPosts
                  .map((p) => ({ ...p, relevanceScore: scoreContent(p, userProfile) }))
                  .sort((a, b) => b.relevanceScore - a.relevanceScore)
                  .slice(0, 3)
                  .map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => setSelectedBlogSlug(p.slug)}
                      className="feature-card" style={{ textAlign: 'left', border: 'none', padding: '24px', display: 'flex', flexDirection: 'column' }}
                    >
                      <h4 style={{ fontSize: '22px', marginBottom: '12px', lineHeight: '1.3' }}>{p.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.6', flex: 1, marginBottom: '24px' }}>{p.excerpt}</p>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'block' }}>
                        {p.readTimeMinutes} min read · NutriScope Editorial
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          <h3>All articles</h3>
          <div className="recommendation-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
            {blogPosts.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelectedBlogSlug(p.slug)}
                className="feature-card" style={{ textAlign: 'left', border: 'none', padding: '24px', display: 'flex', flexDirection: 'column' }}
              >
                <h4 style={{ fontSize: '22px', marginBottom: '12px', lineHeight: '1.3' }}>{p.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.6', flex: 1, marginBottom: '24px' }}>{p.excerpt}</p>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'block' }}>
                  {p.readTimeMinutes} min read · NutriScope Editorial
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Blog reading view (state-driven, no route) ---------------- */}
      {learnSubTab === "blogs" && selectedBlog && (
        <div className="calculator-container" style={{ flexDirection: 'column', padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={() => setSelectedBlogSlug(null)} className="calc-reset-btn" style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
            ← Back to all articles
          </button>
          <article style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 className="section-heading" style={{ fontSize: '36px', marginBottom: '16px', lineHeight: '1.2' }}>{selectedBlog.title}</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'block' }}>
              By {selectedBlog.author} · {selectedBlog.publishedDate} ·{" "}
              {selectedBlog.readTimeMinutes} min read
            </p>
            <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '16px', color: 'rgba(255,255,255,0.85)' }}>
              <ReactMarkdown>{selectedBlog.body}</ReactMarkdown>
            </div>
            <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
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
    <button onClick={() => onOpen(video)} className="feature-card" style={{ padding: 0, textAlign: 'left', border: 'none', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} aria-label={`Play ${video.title}`}>
      <img
        src={thumbUrl(video.youtubeId)}
        alt={`Thumbnail for ${video.title}`}
        loading="lazy"
        style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
      />
      <div style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '18px', marginBottom: '8px', lineHeight: '1.4' }}>{video.title}</h4>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>
          {video.channelName} · {video.durationLabel}
        </p>
        {score !== null && score > 0 && (
          <span className="risk-badge risk-low" style={{ marginTop: '12px', display: 'inline-block' }}>Match score: {score}</span>
        )}
      </div>
    </button>
  );
}

/* ============================================================================
 * Inline styles — mostly cleared out in favor of site classes.
 * Modal styles remain inline as there may not be a global modal setup.
 * ============================================================================ */
const styles = {
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
