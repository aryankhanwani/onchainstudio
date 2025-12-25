#!/usr/bin/env node

/**
 * HLS Video Conversion Script
 * 
 * This script converts MP4 videos to HLS format with multiple quality levels
 * for adaptive bitrate streaming.
 * 
 * Requirements:
 * - FFmpeg must be installed on your system
 * 
 * Usage:
 *   node scripts/convert-to-hls.js <input-video.mp4> [output-directory]
 * 
 * Example:
 *   node scripts/convert-to-hls.js public/video.mp4
 *   node scripts/convert-to-hls.js public/video.mp4 public/videos
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if FFmpeg is installed
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ Error: No input file specified');
  console.log('\nUsage: node scripts/convert-to-hls.js <input-video.mp4> [output-directory]');
  console.log('Example: node scripts/convert-to-hls.js public/video.mp4');
  process.exit(1);
}

const inputFile = args[0];
const outputDir = args[1] || path.dirname(inputFile);

// Validate input file
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Error: Input file not found: ${inputFile}`);
  process.exit(1);
}

// Check FFmpeg
if (!checkFFmpeg()) {
  console.error('❌ Error: FFmpeg is not installed or not in PATH');
  console.log('\nPlease install FFmpeg:');
  console.log('  macOS:   brew install ffmpeg');
  console.log('  Ubuntu:  sudo apt-get install ffmpeg');
  console.log('  Windows: Download from https://ffmpeg.org/download.html');
  process.exit(1);
}

// Get input filename without extension
const inputBasename = path.basename(inputFile, path.extname(inputFile));
const outputPath = path.join(outputDir, inputBasename);

// Create output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

console.log('\n🎬 Converting video to HLS format...');
console.log(`   Input:  ${inputFile}`);
console.log(`   Output: ${outputPath}\n`);

/**
 * FFmpeg command explanation:
 * -i: input file
 * -c:v libx264: use H.264 video codec
 * -c:a aac: use AAC audio codec
 * -b:a 128k: audio bitrate 128kbps
 * -ar 44100: audio sample rate
 * -ac 2: stereo audio
 * 
 * Multiple quality levels for adaptive streaming:
 * - 1080p: 5000k bitrate
 * - 720p:  2800k bitrate
 * - 480p:  1400k bitrate
 * - 360p:  800k bitrate
 * 
 * -var_stream_map: maps video and audio streams for each variant
 * -master_pl_name: name of the master playlist file
 * -hls_time: target duration of each segment (6 seconds)
 * -hls_list_size: maximum number of playlist entries (0 = all)
 * -hls_segment_filename: naming pattern for segments
 */

const ffmpegCommand = `ffmpeg -i "${inputFile}" -filter_complex "[0:v]split=4[v1][v2][v3][v4]; [v1]scale=w=1920:h=1080:force_original_aspect_ratio=decrease:force_divisible_by=2[v1out]; [v2]scale=w=1280:h=720:force_original_aspect_ratio=decrease:force_divisible_by=2[v2out]; [v3]scale=w=854:h=480:force_original_aspect_ratio=decrease:force_divisible_by=2[v3out]; [v4]scale=w=640:h=360:force_original_aspect_ratio=decrease:force_divisible_by=2[v4out]" -map "[v1out]" -c:v:0 libx264 -b:v:0 5000k -maxrate:v:0 5350k -bufsize:v:0 7500k -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map "[v2out]" -c:v:1 libx264 -b:v:1 2800k -maxrate:v:1 2996k -bufsize:v:1 4200k -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map "[v3out]" -c:v:2 libx264 -b:v:2 1400k -maxrate:v:2 1498k -bufsize:v:2 2100k -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map "[v4out]" -c:v:3 libx264 -b:v:3 800k -maxrate:v:3 856k -bufsize:v:3 1200k -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map a:0 -c:a:0 aac -b:a:0 128k -ac 2 -ar 44100 -map a:0 -c:a:1 aac -b:a:1 128k -ac 2 -ar 44100 -map a:0 -c:a:2 aac -b:a:2 96k -ac 2 -ar 44100 -map a:0 -c:a:3 aac -b:a:3 64k -ac 2 -ar 44100 -f hls -hls_time 6 -hls_playlist_type vod -hls_flags independent_segments -hls_segment_type mpegts -hls_segment_filename "${outputPath}/stream_%v/segment_%03d.ts" -master_pl_name ${inputBasename}.m3u8 -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2 v:3,a:3" "${outputPath}/stream_%v.m3u8"`;

// Create stream directories
for (let i = 0; i < 4; i++) {
  const streamDir = path.join(outputPath, `stream_${i}`);
  if (!fs.existsSync(streamDir)) {
    fs.mkdirSync(streamDir, { recursive: true });
  }
}

try {
  console.log('⏳ Processing... (this may take a while)\n');
  
  // Execute FFmpeg command
  execSync(ffmpegCommand, {
    stdio: 'inherit',
    shell: true,
  });
  
  // Move master playlist to public folder for easy access
  const masterPlaylistSrc = path.join(outputPath, `${inputBasename}.m3u8`);
  const masterPlaylistDest = path.join(outputDir, `${inputBasename}.m3u8`);
  
  if (fs.existsSync(masterPlaylistSrc)) {
    fs.copyFileSync(masterPlaylistSrc, masterPlaylistDest);
    
    // Fix paths in master playlist
    let masterContent = fs.readFileSync(masterPlaylistDest, 'utf8');
    masterContent = masterContent.replace(/^(stream_\d+\.m3u8)$/gm, `${inputBasename}/$1`);
    fs.writeFileSync(masterPlaylistDest, masterContent, 'utf8');
    
    // Fix paths in segment playlists
    for (let i = 0; i < 4; i++) {
      const segmentPlaylist = path.join(outputPath, `stream_${i}.m3u8`);
      if (fs.existsSync(segmentPlaylist)) {
        let content = fs.readFileSync(segmentPlaylist, 'utf8');
        content = content.replace(/^(segment_\d+\.ts)$/gm, `stream_${i}/$1`);
        fs.writeFileSync(segmentPlaylist, content, 'utf8');
      }
    }
    
    console.log(`\n✅ Conversion complete!`);
    console.log(`\n📁 Generated files:`);
    console.log(`   Master playlist: ${masterPlaylistDest}`);
    console.log(`   Segments: ${outputPath}/stream_*/`);
    console.log(`\n🎯 Use in your component:`);
    console.log(`   <HLSVideoPlayer src="/${path.relative('public', masterPlaylistDest)}" />`);
  }
  
} catch (error) {
  console.error('\n❌ Conversion failed:', error.message);
  process.exit(1);
}


