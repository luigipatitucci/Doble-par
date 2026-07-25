import Hls from 'hls.js';

/**
 * Setup HLS for a video element
 * Handles both Safari (native HLS) and other browsers (hls.js)
 * 
 * @param videoElement - The video element to attach HLS to
 * @param src - The .m3u8 stream URL
 * @param options - Optional HLS configuration
 * @returns Cleanup function to destroy HLS instance
 */
export const setupHls = (
  videoElement: HTMLVideoElement,
  src: string,
  options?: {
    startLevel?: number;
    onReady?: () => void;
    onError?: (error: any) => void;
  }
): (() => void) => {
  const { startLevel = -1, onReady, onError } = options || {};

  // Safari native HLS support
  if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = src;
    
    const handleLoadedMetadata = () => {
      if (onReady) onReady();
    };

    const handleError = (e: Event) => {
      if (onError) onError(e);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('error', handleError);
    };
  }
  // Other browsers using hls.js
  else if (Hls.isSupported()) {
    const hls = new Hls({
      startLevel,
      maxBufferLength: 30,
      enableWorker: true,
      lowLatencyMode: false,
      backBufferLength: 90,
    });

    hls.loadSource(src);
    hls.attachMedia(videoElement);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (onReady) onReady();
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        console.error('HLS fatal error:', data);
        if (onError) onError(data);
      }
    });

    return () => {
      hls.destroy();
    };
  }

  // Fallback: no HLS support
  console.warn('HLS not supported in this browser');
  videoElement.src = src;
  
  return () => {
    // No cleanup needed
  };
};

/**
 * Check if a video URL is an HLS stream
 */
export const isHlsVideo = (url: string): boolean => {
  return url.includes('.m3u8');
};
