const fs = require('fs');
let code = fs.readFileSync('src/components/LearnHub.jsx', 'utf-8');

code = code.replace(
  /<section className="learn-hub" style=\{styles\.section\}>/g,
  '<section className="calculator-section" style={{ paddingTop: \\'100px\\' }}>'
);
code = code.replace(
  /<h2 style=\{styles.h2\}>\s*<span aria-hidden>📚<\/span> Learn\s*<\/h2>/,
  '<div className="section-label">📚 Learn Hub</div> <h2 className="section-heading"> Evidence-Based<br /> <span className="gradient-text">Nutrition Education.</span> </h2>'
);
code = code.replace(
  /<p style=\{styles.disclaimer\}>/g,
  '<p className="section-subheading" style={{ maxWidth: \\'800px\\', margin: \\'0 auto\\', fontSize: \\'13px\\', fontStyle: \\'italic\\', opacity: 0.7 }}>'
);
code = code.replace(
  /<div role="tablist" style=\{styles.subTabs\}>/g,
  '<div role="tablist" className="gender-selector" style={{ justifyContent: \\'center\\', marginBottom: \\'40px\\' }}>'
);
code = code.replace(
  /style=\{learnSubTab === "videos" \? \{ \.\.\.styles\.subTab, \.\.\.styles\.subTabActive \} : styles\.subTab\}/g, 
  'className={`gender-btn ${learnSubTab === "videos" ? "gender-btn-active" : ""}`}'
);
code = code.replace(
  /style=\{learnSubTab === "blogs" \? \{ \.\.\.styles\.subTab, \.\.\.styles\.subTabActive \} : styles\.subTab\}/g, 
  'className={`gender-btn ${learnSubTab === "blogs" ? "gender-btn-active" : ""}`}'
);
code = code.replace(
  /style=\{styles.subPage\}/g, 
  'className="calculator-container" style={{ flexDirection: \\'column\\', padding: \\'0 20px\\', maxWidth: \\'1200px\\', margin: \\'0 auto\\' }}'
);
code = code.replace(
  /style=\{styles.personalStrip\}/g, 
  'className="diet-section warning-section" style={{ marginBottom: \\'32px\\' }}'
);
code = code.replace(
  /style=\{styles.personalLine\}/g, 
  'style={{ fontSize: \\'15px\\', color: \\'#ff79c6\\', marginBottom: \\'20px\\', fontWeight: \\'500\\' }}'
);
code = code.replace(
  /style=\{styles.grid\}/g, 
  'className="recommendation-cards" style={{ gridTemplateColumns: \\'repeat(auto-fill, minmax(320px, 1fr))\\' }}'
);
code = code.replace(
  /<h3 style=\{styles.h3\}>/g, 
  '<h3>'
);
code = code.replace(
  /<p style=\{styles.subtle\}>/g, 
  '<p style={{ fontSize: \\'14px\\', color: \\'rgba(255,255,255,0.6)\\', marginBottom: \\'24px\\' }}>'
);
code = code.replace(
  /style=\{styles.empty\}/g, 
  'className="calc-placeholder"'
);
code = code.replace(
  /<p>🎬 New content coming soon\.<\/p>/g,
  '<div className="calc-placeholder-icon">🎬</div><h3 className="calc-placeholder-title">New content coming soon.</h3>'
);
code = code.replace(
  /style=\{styles.blogList\}/g, 
  'className="recommendation-cards"'
);
code = code.replace(
  /style=\{styles.blogExcerptCard\}/g, 
  'className="feature-card" style={{ textAlign: \\'left\\', border: \\'none\\', padding: \\'24px\\', display: \\'flex\\', flexDirection: \\'column\\' }}'
);
code = code.replace(
  /style=\{styles.blogTitle\}/g, 
  'style={{ fontSize: \\'22px\\', marginBottom: \\'12px\\', lineHeight: \\'1.3\\' }}'
);
code = code.replace(
  /style=\{styles.blogExcerpt\}/g, 
  'style={{ color: \\'rgba(255,255,255,0.6)\\', fontSize: \\'15px\\', lineHeight: \\'1.6\\', flex: 1, marginBottom: \\'24px\\' }}'
);
code = code.replace(
  /style=\{styles.blogMeta\}/g, 
  'style={{ fontSize: \\'13px\\', color: \\'rgba(255,255,255,0.4)\\', paddingTop: \\'16px\\', borderTop: \\'1px solid rgba(255,255,255,0.05)\\', display: \\'block\\' }}'
);
code = code.replace(
  /style=\{styles.backBtn\}/g, 
  'className="calc-reset-btn" style={{ alignSelf: \\'flex-start\\' }}'
);
code = code.replace(
  /style=\{styles.blogArticle\}/g, 
  'style={{ background: \\'rgba(0,0,0,0.3)\\', borderRadius: \\'24px\\', padding: \\'40px\\', border: \\'1px solid rgba(255,255,255,0.05)\\' }}'
);
code = code.replace(
  /style=\{styles.blogArticleTitle\}/g, 
  'className="section-heading" style={{ fontSize: \\'36px\\', marginBottom: \\'16px\\', lineHeight: \\'1.2\\' }}'
);
code = code.replace(
  /style=\{styles.markdownBody\}/g, 
  'className="blog-content" style={{ lineHeight: \\'1.8\\', fontSize: \\'16px\\', color: \\'rgba(255,255,255,0.85)\\' }}'
);
code = code.replace(
  /style=\{styles.blogFootnote\}/g, 
  'style={{ fontSize: \\'13px\\', fontStyle: \\'italic\\', color: \\'rgba(255,255,255,0.4)\\', marginTop: \\'40px\\', paddingTop: \\'20px\\', borderTop: \\'1px solid rgba(255,255,255,0.1)\\' }}'
);
code = code.replace(
  /style=\{styles.videoCard\}/g, 
  'className="feature-card" style={{ padding: 0, textAlign: \\'left\\', border: \\'none\\', position: \\'relative\\', overflow: \\'hidden\\', display: \\'flex\\', flexDirection: \\'column\\' }}'
);
code = code.replace(
  /style=\{styles.videoThumb\}/g, 
  'style={{ width: \\'100%\\', aspectRatio: \\'16/9\\', objectFit: \\'cover\\', display: \\'block\\' }}'
);
code = code.replace(
  /style=\{styles.videoBody\}/g, 
  'style={{ padding: \\'20px\\' }}'
);
code = code.replace(
  /style=\{styles.videoTitle\}/g, 
  'style={{ fontSize: \\'18px\\', marginBottom: \\'8px\\', lineHeight: \\'1.4\\' }}'
);
code = code.replace(
  /style=\{styles.videoChannel\}/g, 
  'style={{ color: \\'rgba(255,255,255,0.5)\\', fontSize: \\'13px\\', margin: 0 }}'
);
code = code.replace(
  /style=\{styles.matchBadge\}/g, 
  'className="risk-badge risk-low" style={{ marginTop: \\'12px\\', display: \\'inline-block\\' }}'
);

fs.writeFileSync('src/components/LearnHub.jsx', code);
console.log('Update Complete');
