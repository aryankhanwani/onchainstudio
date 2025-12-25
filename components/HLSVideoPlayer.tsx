"use client"

/**
 * HLS Video Player Component
 * 
 * A universal video player that handles HLS streaming with:
 * - Native HLS support for Safari
 * - HLS.js for Chrome/Firefox/Edge
 * - Automatic format detection (HLS vs regular MP4)
 * - Adaptive bitrate streaming
 * - Smooth playback across varying network conditions
 * 
 * @example
 * ```tsx
 * <HLSVideoPlayer
 *   src="/videos/sample.m3u8"
 *   poster="/thumbnails/sample.jpg"
 *   autoPlay
 *   loop
 *   muted
 * />
 * ```
 */

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import Hls from 'hls.js'

interface HLSVideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  onHlsError?: (error: any) => void
  hlsConfig?: Partial<Hls['config']>
}

export interface HLSVideoPlayerRef {
  video: HTMLVideoElement | null
  hls: Hls | null
}

const HLSVideoPlayer = forwardRef<HLSVideoPlayerRef, HLSVideoPlayerProps>(
  ({ src, onHlsError, hlsConfig, ...videoProps }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const hlsRef = useRef<Hls | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Expose video and hls instance to parent
    useImperativeHandle(ref, () => ({
      video: videoRef.current,
      hls: hlsRef.current,
    }))

    // Check if the video source is HLS
    const isHLS = (source: string) => {
      return source.endsWith('.m3u8') || source.includes('.m3u8')
    }

    useEffect(() => {
      const video = videoRef.current
      if (!video || !src) return

      const videoSrc = src

      // Check if browser supports native HLS (Safari only)
      // We need to check both canPlayType AND if HLS.js is NOT supported (which means it's Safari)
      const canPlayHLS = video.canPlayType('application/vnd.apple.mpegurl')
      const isSafari = !Hls.isSupported() && canPlayHLS !== ''
      
      if (isHLS(videoSrc)) {
        // HLS source detected
        if (isSafari && canPlayHLS) {
          // Native HLS support (Safari)
          video.src = videoSrc
        } else if (Hls.isSupported()) {
          // Use HLS.js for browsers without native support
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
            backBufferLength: 90,
            maxBufferLength: 30,
            maxBufferSize: 60 * 1000 * 1000, // 60 MB
            maxMaxBufferLength: 600,
            ...hlsConfig,
          })

          hlsRef.current = hls

          hls.loadSource(videoSrc)
          hls.attachMedia(video)

          // Event handlers
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  hls.startLoad()
                  break
                case Hls.ErrorTypes.MEDIA_ERROR:
                  hls.recoverMediaError()
                  break
                default:
                  setError('Unable to load video')
                  hls.destroy()
                  break
              }
            }

            onHlsError?.(data)
          })

          return () => {
            if (hls) {
              hls.destroy()
              hlsRef.current = null
            }
          }
        } else {
          // HLS not supported
          setError('HLS playback not supported in this browser')
        }
      } else {
        // Regular MP4 or other video source
        video.src = videoSrc
      }

      return () => {
        // Cleanup
        if (hlsRef.current) {
          hlsRef.current.destroy()
          hlsRef.current = null
        }
      }
    }, [src, hlsConfig, onHlsError])

    if (error) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-black text-white">
          <p>{error}</p>
        </div>
      )
    }

    return (
      <video
        ref={videoRef}
        {...videoProps}
      />
    )
  }
)

HLSVideoPlayer.displayName = 'HLSVideoPlayer'

export default HLSVideoPlayer


