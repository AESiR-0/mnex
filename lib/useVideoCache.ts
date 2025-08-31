"use client";
import { useEffect, useRef, useState } from 'react';

interface VideoCacheItem {
  src: string;
  element: HTMLVideoElement;
  loaded: boolean;
  error: boolean;
}

class VideoCache {
  private static instance: VideoCache;
  private cache = new Map<string, VideoCacheItem>();
  private preloadQueue: string[] = [];
  private isProcessing = false;

  static getInstance(): VideoCache {
    if (!VideoCache.instance) {
      VideoCache.instance = new VideoCache();
    }
    return VideoCache.instance;
  }

  async preloadVideo(src: string): Promise<void> {
    if (this.cache.has(src)) {
      return; // Already cached
    }

    if (this.preloadQueue.includes(src)) {
      return; // Already in queue
    }

    this.preloadQueue.push(src);
    
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.preloadQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.preloadQueue.length > 0) {
      const src = this.preloadQueue.shift()!;
      
      try {
        await this.loadVideo(src);
      } catch (error) {
        console.warn(`Failed to preload video: ${src}`, error);
      }
    }

    this.isProcessing = false;
  }

  private async loadVideo(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.muted = true;
      video.preload = 'metadata';
      
      video.addEventListener('loadedmetadata', () => {
        this.cache.set(src, {
          src,
          element: video,
          loaded: true,
          error: false
        });
        resolve();
      });

      video.addEventListener('error', () => {
        this.cache.set(src, {
          src,
          element: video,
          loaded: false,
          error: true
        });
        reject(new Error(`Failed to load video: ${src}`));
      });

      video.src = src;
    });
  }

  getVideo(src: string): VideoCacheItem | undefined {
    return this.cache.get(src);
  }

  isLoaded(src: string): boolean {
    return this.cache.get(src)?.loaded || false;
  }

  hasError(src: string): boolean {
    return this.cache.get(src)?.error || false;
  }

  clearCache(): void {
    this.cache.clear();
    this.preloadQueue = [];
  }
}

export function useVideoCache(videoSrc: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cache = useRef(VideoCache.getInstance());

  useEffect(() => {
    if (!videoSrc) return;

    const loadVideo = async () => {
      try {
        await cache.current.preloadVideo(videoSrc);
        setIsLoaded(cache.current.isLoaded(videoSrc));
        setHasError(cache.current.hasError(videoSrc));
      } catch (error) {
        setHasError(true);
      }
    };

    loadVideo();
  }, [videoSrc]);

  return {
    isLoaded,
    hasError,
    preloadVideo: () => cache.current.preloadVideo(videoSrc)
  };
}

export function useVideoPreloader(videoSources: string[]) {
  const cache = useRef(VideoCache.getInstance());

  useEffect(() => {
    videoSources.forEach(src => {
      if (src) {
        cache.current.preloadVideo(src);
      }
    });
  }, [videoSources]);

  return {
    isLoaded: (src: string) => cache.current.isLoaded(src),
    hasError: (src: string) => cache.current.hasError(src),
    preloadAll: () => videoSources.forEach(src => cache.current.preloadVideo(src))
  };
}
