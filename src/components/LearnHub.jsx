import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { videoLibrary } from '../data/videoLibrary';
import { blogPosts } from '../data/blogPosts';

export default function LearnHub() {
  const [learnSubTab, setLearnSubTab] = useState('videos'); // 'videos' | 'blogs'
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(null); // null = list view, string = post
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Load profile from localStorage
    const saved = localStorage.getItem('nutriscope_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.calculated) {
          setProfile(parsed);
        }
      } catch (e) {
        console.error('Failed to parse profile', e);
      }
    }
  }, []);

  const intersectionCount = (arr1 = [], arr2 = []) => {
    if (!arr1 || !arr2) return 0;
    return arr1.filter(item => arr2.includes(item)).length;
  };

  const scoreContent = (item, userProfile) => {
    let score = 0;
    if (userProfile.dietaryPattern && item.dietaryPatternTags?.includes(userProfile.dietaryPattern)) score += 3;
    score += intersectionCount(item.healthFlagTags, userProfile.healthFlags) * 3;
    if (userProfile.goal && item.goalTags?.includes(userProfile.goal)) score += 2;
    score += intersectionCount(item.nutrientTags, userProfile.topRiskNutrients) * 2;
    return score;
  };

  const rankedVideos = useMemo(() => {
    if (!profile) {
      return videoLibrary.filter(v => v.featured).slice(0, 6);
    }
    const scored = videoLibrary.map(v => ({ ...v, score: scoreContent(v, profile) }));
    return scored.sort((a, b) => b.score - a.score).slice(0, 6);
  }, [profile]);

  const rankedBlogs = useMemo(() => {
    if (!profile) {
      return blogPosts.slice(0, 6); // Just show the latest
    }
    const scored = blogPosts.map(b => ({ ...b, score: scoreContent(b, profile) }));
    return scored.sort((a, b) => b.score - a.score).slice(0, 6);
  }, [profile]);

  const whyPersonalizedText = useMemo(() => {
    if (!profile) return null;
    let reasons = [];
    if (profile.dietaryPattern) reasons.push(`your ${profile.dietaryPattern} diet`);
    if (profile.healthFlags && profile.healthFlags.length > 0) reasons.push(`health goals`);
    if (profile.topRiskNutrients && profile.topRiskNutrients.length > 0) reasons.push(`nutrient needs`);
    
    if (reasons.length === 0) return null;
    return `Because you're focused on ${reasons.join(' and ')}…`;
  }, [profile]);

  return (
    <section className="learn-hub-section" style={{ paddingTop: '100px', minHeight: 'calc(100vh - 72px)', paddingBottom: '60px' }}>
      
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
        <p className="section-subheading" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Explore curated videos and original articles tailored to your unique metabolic profile. 
          {profile 
            ? " We've customized this feed based on your Diet Guide inputs." 
            : " Complete the Diet Guide to unlock a fully personalized feed."}
        </p>

        <div style={{ marginTop: '16px', maxWidth: '800px', margin: '16px auto 0', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '4px solid rgba(255, 255, 255, 0.2)', fontSize: '13px', textAlign: 'left', color: 'rgba(255,255,255,0.6)' }}>
          <strong>Disclaimer:</strong> Videos and articles here are for general education. NutriScope doesn't produce or fact-check third-party video content — claims made by outside creators are theirs, not verified medical advice. Always confirm with a doctor or registered dietitian.
        </div>
      </motion.div>

      {/* Sub-navigation */}
      {!selectedBlogSlug && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <button
            className={`gender-btn ${learnSubTab === 'videos' ? 'gender-btn-active' : ''}`}
            onClick={() => setLearnSubTab('videos')}
            style={{ width: '150px' }}
          >
            🎬 Videos
          </button>
          <button
            className={`gender-btn ${learnSubTab === 'blogs' ? 'gender-btn-active' : ''}`}
            onClick={() => setLearnSubTab('blogs')}
            style={{ width: '150px' }}
          >
            📝 Articles
          </button>
        </div>
      )}

      {/* Content Area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <AnimatePresence mode="wait">
          
          {/* VIDEOS TAB */}
          {learnSubTab === 'videos' && !selectedBlogSlug && (
            <motion.div
              key="videos-tab"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {profile && whyPersonalizedText && (
                <p style={{ fontSize: '14px', color: '#ff79c6', marginBottom: '24px', fontWeight: '500' }}>✨ {whyPersonalizedText}</p>
              )}
              
              {rankedVideos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
                  <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Content Coming Soon</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>We are currently curating the best nutrition videos for this section. Check back later!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                  {rankedVideos.map(video => (
                    <div key={video.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
                        <iframe
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div style={{ padding: '20px' }}>
                        <h4 style={{ fontSize: '18px', marginBottom: '8px', lineHeight: '1.4' }}>{video.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                          <span>{video.channelName}</span>
                          <span>{video.durationLabel}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* BLOGS TAB - List View */}
          {learnSubTab === 'blogs' && !selectedBlogSlug && (
            <motion.div
              key="blogs-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {profile && whyPersonalizedText && (
                <p style={{ fontSize: '14px', color: '#ff79c6', marginBottom: '24px', fontWeight: '500' }}>✨ {whyPersonalizedText}</p>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                {rankedBlogs.map(blog => (
                  <div key={blog.slug} style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {blog.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>{tag}</span>
                      ))}
                    </div>
                    <h3 style={{ fontSize: '22px', marginBottom: '12px', lineHeight: '1.3' }}>{blog.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.6', flex: 1 }}>{blog.excerpt}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{blog.readTimeMinutes} min read</span>
                      <button 
                        onClick={() => setSelectedBlogSlug(blog.slug)}
                        style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        Read Post →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BLOG READING VIEW */}
          {selectedBlogSlug && (
            <motion.div
              key="blog-post"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(0,0,0,0.3)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <button 
                onClick={() => setSelectedBlogSlug(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}
              >
                ← Back to Articles
              </button>
              
              {(() => {
                const post = blogPosts.find(b => b.slug === selectedBlogSlug);
                if (!post) return <div>Post not found.</div>;
                return (
                  <div>
                    <h1 style={{ fontSize: '36px', marginBottom: '16px', lineHeight: '1.2' }}>{post.title}</h1>
                    <div style={{ display: 'flex', gap: '16px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span>By {post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTimeMinutes} min read</span>
                    </div>

                    <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '16px', color: 'rgba(255,255,255,0.85)' }}>
                      <ReactMarkdown>{post.body}</ReactMarkdown>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
