'use client';

import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';

import MuxPlayer, {
  type MuxPlayerRefAttributes,
} from '@mux/mux-player-react';

type VideoSource = 'mux' | 'fallback' | 'poster';

interface SafeVideoProps {
  muxPlaybackId: string;
  fallbackVideo?: string;
  poster: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  startTime?: number;
  playing?: boolean;
  onLoadedData?: () => void;
  onError?: () => void;
  onVideoReady?: () => void;
}

export const SafeVideo = forwardRef<HTMLVideoElement, SafeVideoProps>(
  (
    {
      muxPlaybackId,
      fallbackVideo,
      poster,
      className = '',
      muted = true,
      loop = false,
      autoPlay = false,
      playsInline = true,
      controls = false,
      startTime,
      playing,
      onLoadedData,
      onError,
      onVideoReady,
    },
    ref
  ) => {
    const [source, setSource] = useState<VideoSource>('mux');

    // MuxPlayer NO devuelve directamente un HTMLVideoElement.
    // Su elemento <video> interno está disponible mediante .media
    const muxRef = useRef<MuxPlayerRefAttributes>(null);

    // El fallback sí es un <video> HTML normal.
    const fallbackRef = useRef<HTMLVideoElement>(null);

    const hasErrorOccurred = useRef(false);

    /**
     * Hacemos que los componentes que utilizan SafeVideo
     * siempre reciban un HTMLVideoElement.
     *
     * Esto permite hacer:
     *
     * videoRef.current.play()
     * videoRef.current.pause()
     * videoRef.current.currentTime = 0
     *
     * independientemente de si estamos usando Mux o fallback.
     */
    useImperativeHandle(
      ref,
      () => {
        if (source === 'mux' && muxRef.current?.media) {
          return muxRef.current.media as HTMLVideoElement;
        }

        if (source === 'fallback' && fallbackRef.current) {
          return fallbackRef.current;
        }

        return null as any;
      },
      [source]
    );

    /**
     * Flag para forzar el fallback manualmente.
     *
     * NEXT_PUBLIC_FORCE_VIDEO_FALLBACK=true
     *
     * sirve para comprobar que los MP4 de respaldo funcionan.
     */
    const FORCE_VIDEO_FALLBACK =
      typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_FORCE_VIDEO_FALLBACK === 'true';

    /**
     * Cada vez que cambia el playback ID:
     *
     * - volvemos a intentar Mux
     * - o usamos fallback si la flag está activada
     *
     * Esto es importante para la navegación del modal.
     */
    useEffect(() => {
      setSource(
        FORCE_VIDEO_FALLBACK
          ? fallbackVideo
            ? 'fallback'
            : 'poster'
          : 'mux'
      );

      hasErrorOccurred.current = false;
    }, [muxPlaybackId, FORCE_VIDEO_FALLBACK, fallbackVideo]);

    /**
     * Control de reproducción mediante prop `playing`
     * 
     * Cuando el componente padre pasa playing={true/false},
     * SafeVideo maneja play/pause internamente sin que el padre
     * necesite acceder al elemento de video interno.
     */
    useEffect(() => {
      // Solo controlar reproducción si la prop `playing` fue proporcionada
      if (playing === undefined) return;

      const performPlayPause = async () => {
        let videoElement: HTMLVideoElement | null = null;

        // Obtener el elemento de video según la fuente actual
        if (source === 'mux' && muxRef.current?.media) {
          videoElement = muxRef.current.media as HTMLVideoElement;
        } else if (source === 'fallback' && fallbackRef.current) {
          videoElement = fallbackRef.current;
        }

        if (!videoElement) return;

        try {
          if (playing) {
            // Reproducir
            await videoElement.play();
          } else {
            // Pausar y resetear al inicio para previews
            videoElement.pause();
            if (!controls) {
              // Solo resetear en previews (sin controles)
              videoElement.currentTime = 0;
            }
          }
        } catch (error) {
          // Capturar errores de autoplay silenciosamente
          console.debug('Play/pause error:', error);
        }
      };

      performPlayPause();
    }, [playing, source, controls]);

    /**
     * Error de Mux
     */
    const handleMuxError = () => {
      if (hasErrorOccurred.current) return;

      hasErrorOccurred.current = true;

      if (fallbackVideo) {
        console.warn(
          'Mux playback failed, switching to fallback:',
          muxPlaybackId
        );

        setSource('fallback');
      } else {
        console.warn(
          'Mux playback failed and no fallback is available:',
          muxPlaybackId
        );

        setSource('poster');
        onError?.();
      }
    };

    /**
     * Error del MP4 fallback
     */
    const handleFallbackError = () => {
      console.error(
        'Fallback video failed, showing poster:',
        fallbackVideo
      );

      setSource('poster');
      onError?.();
    };

    const handleMuxLoadedData = () => {
      onLoadedData?.();
    };

    const handleFallbackLoadedData = () => {
      onLoadedData?.();
    };

    /**
     * Handlers para notificar cuando el video está realmente reproduciendo.
     * Esto previene el flash negro al asegurar que el video tiene contenido
     * visible antes de mostrarlo.
     */
    const handleMuxPlaying = () => {
      onVideoReady?.();
    };

    const handleFallbackPlaying = () => {
      onVideoReady?.();
    };

    /**
     * Estilos de MuxPlayer.
     *
     * IMPORTANTE:
     * En @mux/mux-player-react 2.9.1 no usamos
     * controls={false}.
     *
     * Cuando controls=false ocultamos la interfaz
     * completa mediante --controls.
     */
    const muxStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',

      ...(controls
        ? {}
        : {
            '--controls': 'none',
          }),
    } as React.CSSProperties;

    /**
     * ==========================
     * MUX
     * ==========================
     */
    if (source === 'mux') {
      return (
        <MuxPlayer
          ref={muxRef}
          playbackId={muxPlaybackId}
          streamType="on-demand"
          poster={poster}
          muted={muted}
          loop={loop}
          autoPlay={autoPlay}
          startTime={startTime}
          playsInline={playsInline}
          className={className}
          onError={handleMuxError}
          onLoadedData={handleMuxLoadedData}
          onPlaying={handleMuxPlaying}
          style={
            {
              width: '100%',
              height: '100%',
              display: 'block',

              // Hace que el VIDEO y el POSTER llenen el reproductor
              '--media-object-fit': 'cover',
              '--media-object-position': 'center',

              // Ocultar completamente Media Chrome UI cuando controls === false
              ...(controls
                ? {}
                : {
                    '--controls': 'none',
                    '--media-control-display': 'none',
                    '--media-control-background': 'transparent',
                    '--media-gesture-display': 'none',
                    '--media-live-button-display': 'none',
                    '--media-pip-button-display': 'none',
                    '--media-fullscreen-button-display': 'none',
                    '--media-volume-range-display': 'none',
                    '--media-mute-button-display': 'none',
                    '--media-play-button-display': 'none',
                    '--media-time-display-display': 'none',
                    '--media-duration-display-display': 'none',
                    '--media-seek-backward-button-display': 'none',
                    '--media-seek-forward-button-display': 'none',
                    '--media-playback-rate-button-display': 'none',
                    '--media-captions-button-display': 'none',
                    '--media-airplay-button-display': 'none',
                    '--media-chromecast-button-display': 'none',
                    pointerEvents: 'none',
                  }),
            } as React.CSSProperties
          }
        />
      );
    }

    /**
     * ==========================
     * FALLBACK MP4
     * ==========================
     */
    if (source === 'fallback' && fallbackVideo) {
      return (
        <video
          ref={fallbackRef}
          src={fallbackVideo}
          poster={poster}
          muted={muted}
          loop={loop}
          autoPlay={autoPlay}
          playsInline={playsInline}
          controls={controls}
          className={className}
          onError={handleFallbackError}
          onLoadedData={handleFallbackLoadedData}
          onPlaying={handleFallbackPlaying}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            ...(controls ? {} : { pointerEvents: 'none' }),
          }}
        />
      );
    }

    /**
     * ==========================
     * POSTER
     * ==========================
     */
    return (
      <img
        src={poster}
        alt="Video poster"
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    );
  }
);

SafeVideo.displayName = 'SafeVideo';