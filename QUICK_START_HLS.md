# Quick Start: Convert Videos to HLS

## Step-by-Step Guide

### 1. Install FFmpeg (One Time Setup)

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Linux:**
```bash
sudo apt-get install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html

### 2. Convert Your Videos

```bash
# Convert all videos at once
node scripts/convert-to-hls.js public/IMG_0330-1.mp4
node scripts/convert-to-hls.js public/IMG_0330-2.mp4
node scripts/convert-to-hls.js public/1080horizontal.mp4
node scripts/convert-to-hls.js public/yellow-allinone-ecosystem-v3-portrait.mp4
node scripts/convert-to-hls.js "public/1Inch x Yellow Media.mp4"
```

### 3. That's It!

Your app is already configured to use HLS videos. The code has been updated to use `.m3u8` files instead of `.mp4`.

## What Happens Next?

- Videos will play smoothly across all network conditions
- Quality automatically adjusts based on user's internet speed
- Less buffering, better user experience
- Works on Safari (native) and Chrome/Firefox (via HLS.js)

## File Output

After conversion, you'll have:
```
public/
├── video-name.m3u8          ← Use this in your components
└── video-name/              ← Contains video segments
    ├── stream_0/            (1080p)
    ├── stream_1/            (720p)
    ├── stream_2/            (480p)
    └── stream_3/            (360p)
```

## Need Help?

See `HLS_SETUP_GUIDE.md` for detailed documentation.


