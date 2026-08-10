const fs = require('fs');
const path = 'C:/Users/Shriyash Mhamane/OneDrive/Documents/NUTRISCOPE LEARN HUB — COMPLETE IMPLEMENTATION (All-in-One Upload File).md';
const content = fs.readFileSync(path, 'utf-8');

function extractBlock(headerRegex) {
  const headerMatch = content.match(headerRegex);
  if (!headerMatch) return null;
  const startIdx = content.indexOf('```', headerMatch.index);
  if (startIdx === -1) return null;
  const nextNewline = content.indexOf('\n', startIdx) + 1;
  const endIdx = content.indexOf('```', nextNewline);
  if (endIdx === -1) return null;
  return content.substring(nextNewline, endIdx);
}

const videoLib = extractBlock(/## PART 2 — `src\/data\/videoLibrary\.js`/);
if (videoLib) fs.writeFileSync('C:/Users/Shriyash Mhamane/OneDrive/Desktop/NutriScope/src/data/videoLibrary.js', videoLib);

const blogPosts = extractBlock(/## PART 3 — `src\/data\/blogPosts\.js`/);
if (blogPosts) fs.writeFileSync('C:/Users/Shriyash Mhamane/OneDrive/Desktop/NutriScope/src/data/blogPosts.js', blogPosts);

const scoreContent = extractBlock(/## PART 4 — `src\/utils\/scoreContent\.js`/);
if (scoreContent) {
  if (!fs.existsSync('C:/Users/Shriyash Mhamane/OneDrive/Desktop/NutriScope/src/utils')) {
    fs.mkdirSync('C:/Users/Shriyash Mhamane/OneDrive/Desktop/NutriScope/src/utils', { recursive: true });
  }
  fs.writeFileSync('C:/Users/Shriyash Mhamane/OneDrive/Desktop/NutriScope/src/utils/scoreContent.js', scoreContent);
}

const learnHub = extractBlock(/## PART 5 — `src\/components\/LearnHub\.jsx`/);
if (learnHub) fs.writeFileSync('C:/Users/Shriyash Mhamane/OneDrive/Desktop/NutriScope/src/components/LearnHub.jsx', learnHub);

console.log('Done extracting 4 files.');
