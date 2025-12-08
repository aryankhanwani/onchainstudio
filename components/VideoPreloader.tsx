'use client';

import { useEffect } from 'react';

// List of all videos that need to be preloaded
const videosToPreload = [
  '/IMG_0330-1.mp4', // Hero section video
  '/1080horizontal.mp4', // Works section
  '/yellow-allinone-ecosystem-v3-portrait.mp4', // Showcase
  '/1Inch x Yellow Media.mp4', // Showcase
];

export default function VideoPreloader() {
  useEffect(() => {
    // Preload all videos in the background
    const preloadedVideos: HTMLVideoElement[] = [];
    
    videosToPreload.forEach((videoSrc) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = videoSrc;
      video.muted = true;
      video.playsInline = true;
      video.style.display = 'none';
      video.style.position = 'absolute';
      video.style.width = '1px';
      video.style.height = '1px';
      video.style.opacity = '0';
      video.style.pointerEvents = 'none';
      
      // Append to body to start loading
      document.body.appendChild(video);
      
      // Start loading the video
      video.load();
      
      // Try to preload by attempting to play (will be muted so should work)
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing, pause it immediately
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {
            // Ignore autoplay errors, video is still being preloaded
          });
      }
      
      preloadedVideos.push(video);
    });
    
    // Store reference to prevent garbage collection
    (window as any).__preloadedVideos = preloadedVideos;
    
    // Cleanup on unmount
    return () => {
      preloadedVideos.forEach((video) => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
