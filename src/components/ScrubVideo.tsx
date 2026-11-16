import { useEffect, useRef } from 'react';

const VIDEO_URL =
  '/assets/aistudio/kling_20261116_VIDEO_Create_a_s_4730_0_80d8245c.mp4';
const SENSITIVITY = 0.8;

export function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const currentX = event.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        return;
      }

      const viewportWidth = window.innerWidth || 1;
      const timeOffset = (delta / viewportWidth) * SENSITIVITY * video.duration;
      const nextTime = Math.max(
        0,
        Math.min(video.duration, targetTimeRef.current + timeOffset),
      );
      targetTimeRef.current = nextTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = nextTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      isSeekingRef.current = false;
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full object-cover object-[70%_center] pointer-events-none"
    />
  );
}
