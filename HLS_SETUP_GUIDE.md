# HLS Video Streaming Setup Guide

This guide explains how to set up HLS (HTTP Live Streaming) for smooth video playback across all network conditions and devices.

## What is HLS?

HLS (HTTP Live Streaming) is an adaptive bitrate streaming protocol that:
- **Adapts to network conditions** - Automatically switches between quality levels
- **Reduces buffering** - Delivers video in small chunks
- **Works everywhere** - Native support on Safari, HLS.js for Chrome/Firefox
- **Improves user experience** - Smoother playback with varying internet speeds

## Benefits Over Regular MP4

| Feature | Regular MP4 | HLS |
|---------|-------------|-----|
| Adaptive Quality | ❌ Fixed | ✅ Multiple levels |
| Network Adaptation | ❌ No | ✅ Automatic |
| Buffering | ⚠️ Common | ✅ Minimal |
| Large File Handling | ⚠️ Must download | ✅ Streams chunks |
| Mobile Performance | ⚠️ Variable | ✅ Optimized |

## Setup Instructions

### 1. Install FFmpeg

FFmpeg is required to convert videos to HLS format.

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH.

**Verify installation:**
```bash
ffmpeg -version
```

### 2. Install Dependencies

The project already has `hls.js` installed. If needed:

```bash
npm install hls.js
```

### 3. Convert Videos to HLS

Use the provided conversion script:

```bash
# Convert a single video
node scripts/convert-to-hls.js public/video.mp4

# Convert to specific output directory
node scripts/convert-to-hls.js public/video.mp4 public/videos
```

### 4. Batch Convert All Videos

Convert all MP4 files in the public folder:

**macOS/Linux:**
```bash
for video in public/*.mp4; do
  node scripts/convert-to-hls.js "$video"
done
```

**Windows PowerShell:**
```powershell
Get-ChildItem public\*.mp4 | ForEach-Object {
  node scripts/convert-to-hls.js $_.FullName
}
```

### 5. Update Your Code

Replace regular `<video>` tags with `<HLSVideoPlayer>`:

**Before:**
```tsx
<video
  src="/video.mp4"
  autoPlay
  loop
  muted
  playsInline
/>
```

**After:**
```tsx
import HLSVideoPlayer from '@/components/HLSVideoPlayer'

<HLSVideoPlayer
  src="/video.m3u8"
  autoPlay
  loop
  muted
  playsInline
/>
```

## File Structure

After conversion, your files will be organized like this:

```
public/
├── video.m3u8                    # Master playlist (use this in your code)
└── video/                        # Video segments folder
    ├── stream_0/                 # 1080p quality
    │   ├── segment_000.ts
    │   ├── segment_001.ts
    │   └── ...
    ├── stream_1/                 # 720p quality
    │   ├── segment_000.ts
    │   └── ...
    ├── stream_2/                 # 480p quality
    │   └── ...
    ├── stream_3/                 # 360p quality
    │   └── ...
    ├── stream_0.m3u8            # 1080p playlist
    ├── stream_1.m3u8            # 720p playlist
    ├── stream_2.m3u8            # 480p playlist
    └── stream_3.m3u8            # 360p playlist
```

## Quality Levels

The conversion script creates 4 quality levels:

| Quality | Resolution | Video Bitrate | Use Case |
|---------|------------|---------------|----------|
| 1080p   | 1920x1080  | 5000 kbps     | High-speed connections |
| 720p    | 1280x720   | 2800 kbps     | Standard connections |
| 480p    | 854x480    | 1400 kbps     | Mobile/slower connections |
| 360p    | 640x360    | 800 kbps      | Very slow connections |

## HLSVideoPlayer Component API

```tsx
interface HLSVideoPlayerProps {
  src: string                              // Path to .m3u8 file
  onHlsError?: (error: any) => void       // Error handler
  hlsConfig?: Partial<Hls['config']>      // HLS.js configuration
  // ... plus all standard HTML video attributes
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  poster?: string
  controls?: boolean
  className?: string
  style?: React.CSSProperties
}
```

### Example Usage

**Basic:**
```tsx
<HLSVideoPlayer
  src="/my-video.m3u8"
  autoPlay
  loop
  muted
  playsInline
/>
```

**With poster and controls:**
```tsx
<HLSVideoPlayer
  src="/my-video.m3u8"
  poster="/thumbnail.jpg"
  controls
  className="w-full h-full"
/>
```

**With error handling:**
```tsx
<HLSVideoPlayer
  src="/my-video.m3u8"
  onHlsError={(error) => {
    console.error('HLS Error:', error)
    // Handle error (show fallback, etc.)
  }}
/>
```

**With custom HLS.js config:**
```tsx
<HLSVideoPlayer
  src="/my-video.m3u8"
  hlsConfig={{
    maxBufferLength: 60,
    maxMaxBufferLength: 120,
  }}
/>
```

## Videos to Convert

Based on your project, convert these videos:

```bash
# Main videos
node scripts/convert-to-hls.js public/IMG_0330-1.mp4
node scripts/convert-to-hls.js public/IMG_0330-2.mp4
node scripts/convert-to-hls.js public/1080horizontal.mp4
node scripts/convert-to-hls.js public/yellow-allinone-ecosystem-v3-portrait.mp4
node scripts/convert-to-hls.js "public/1Inch x Yellow Media.mp4"
```

## Browser Support

| Browser | Support Method |
|---------|---------------|
| Safari (all versions) | ✅ Native HLS |
| Chrome | ✅ Via HLS.js |
| Firefox | ✅ Via HLS.js |
| Edge | ✅ Via HLS.js |
| Mobile Safari | ✅ Native HLS |
| Mobile Chrome | ✅ Via HLS.js |

## How It Works

1. **Safari/iOS**: Uses native HLS support built into the browser
2. **Chrome/Firefox**: Uses HLS.js library to parse and play HLS streams
3. **Automatic Detection**: The component detects the browser and uses the appropriate method
4. **Quality Switching**: The player monitors bandwidth and switches quality levels automatically

## Advanced Configuration

### Custom FFmpeg Settings

Edit `scripts/convert-to-hls.js` to customize:
- Quality levels
- Bitrates
- Segment duration
- Encoding presets

### HLS.js Configuration

Configure HLS.js behavior via the `hlsConfig` prop:

```tsx
<HLSVideoPlayer
  src="/video.m3u8"
  hlsConfig={{
    // Buffer management
    maxBufferLength: 30,        // seconds
    maxMaxBufferLength: 600,    // seconds
    maxBufferSize: 60 * 1000 * 1000, // bytes
    
    // Performance
    enableWorker: true,
    lowLatencyMode: false,
    
    // Network
    maxLoadingDelay: 4,
    maxBufferHole: 0.5,
  }}
/>
```

## Troubleshooting

### Video doesn't play
- Check browser console for errors
- Verify the .m3u8 file is accessible
- Ensure all segment files (.ts) are in the correct location

### Quality doesn't switch
- Check network throttling in DevTools
- Verify multiple quality levels were created
- Check HLS.js is loaded correctly

### High initial load time
- Reduce `hls_time` in FFmpeg command (smaller segments)
- Enable CDN caching for .m3u8 and .ts files
- Optimize first segment size

### CORS errors
- Add appropriate CORS headers to your server
- For Next.js, this is handled automatically

## Production Deployment

### 1. Commit HLS files
```bash
git add public/*.m3u8 public/*/
git commit -m "Add HLS video streams"
```

### 2. CDN Optimization
For best performance, serve HLS files from a CDN:
- Enable caching for .m3u8 and .ts files
- Set appropriate cache headers
- Consider using a specialized video CDN

### 3. Storage Considerations
HLS files are larger than source MP4s (4x files for 4 quality levels).
Consider:
- Using cloud storage (S3, Cloudflare R2)
- Keeping only necessary quality levels
- Generating HLS on-demand

## Next Steps

1. ✅ Convert all existing MP4 files to HLS
2. ✅ Update all video references in components
3. ✅ Test on different devices and network speeds
4. ⚠️ Monitor performance and adjust quality levels
5. ⚠️ Set up CDN for optimal delivery

## Support

For issues or questions:
- Check browser console for HLS.js errors
- Review FFmpeg output for encoding issues
- Test with network throttling in DevTools
- Verify file paths and accessibility

## References

- [HLS.js Documentation](https://github.com/video-dev/hls.js)
- [FFmpeg HLS Documentation](https://ffmpeg.org/ffmpeg-formats.html#hls-2)
- [Apple HLS Specification](https://developer.apple.com/streaming/)




