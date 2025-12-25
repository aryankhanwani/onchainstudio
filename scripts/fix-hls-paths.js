#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Find all stream_*.m3u8 files in subdirectories
const publicDir = 'public';
const videos = ['IMG_0330-1', '1080horizontal', 'yellow-allinone-ecosystem-v3-portrait', '1Inch-x-Yellow-Media'];
const streams = ['stream_0', 'stream_1', 'stream_2', 'stream_3'];

console.log('🔧 Fixing HLS segment paths...\n');

videos.forEach(video => {
  streams.forEach(stream => {
    const playlistPath = path.join(publicDir, video, `${stream}.m3u8`);
    
    if (!fs.existsSync(playlistPath)) {
      console.log(`⚠️  Skipping ${playlistPath} (not found)`);
      return;
    }
    
    try {
      let content = fs.readFileSync(playlistPath, 'utf8');
      const originalContent = content;
      
      // Replace segment_XXX.ts with stream_X/segment_XXX.ts
      content = content.replace(/^(segment_\d+\.ts)$/gm, `${stream}/$1`);
      
      if (content !== originalContent) {
        fs.writeFileSync(playlistPath, content, 'utf8');
        console.log(`✅ Fixed: ${playlistPath}`);
      } else {
        console.log(`✓  Already correct: ${playlistPath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${playlistPath}:`, error.message);
    }
  });
});

console.log('\n🎉 All segment paths fixed!');

