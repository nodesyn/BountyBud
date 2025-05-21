import { useState, useEffect } from 'react';

type OptimizedImageOptions = {
  src: string;
  width: number;
  height: number;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
};

export default function useOptimizedImage({
  src,
  width,
  height,
  quality = 75,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageOptions) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Generate a low-quality placeholder if needed and not provided
  const [generatedBlurUrl, setGeneratedBlurUrl] = useState<string | undefined>(
    blurDataURL
  );

  useEffect(() => {
    // Reset state on src change
    setIsLoaded(false);
    setError(null);

    // If we need a blur placeholder but don't have one, generate it
    if (placeholder === 'blur' && !blurDataURL && !generatedBlurUrl) {
      // In a real app, you might create a tiny thumbnail here
      // For this demo, we'll just set a simple colored square
      const canvas = document.createElement('canvas');
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = '#555555';
        ctx.fillRect(0, 0, 10, 10);
        setGeneratedBlurUrl(canvas.toDataURL());
      }
    }

    // Preload the image
    if (priority && typeof window !== 'undefined') {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => {
        setError(new Error(`Failed to load image: ${src}`));
      };
    }
  }, [src, priority, placeholder, blurDataURL, generatedBlurUrl]);

  // Create optimal srcset for responsive images
  const generateSrcSet = () => {
    const breakpoints = [0.5, 1, 1.5, 2];
    return breakpoints
      .map((scale) => {
        const scaledWidth = Math.round(width * scale);
        // In a real app, you would generate optimized URLs here
        // For this demo, we'll just use the original with a query parameter
        return `${src}?w=${scaledWidth}&q=${quality} ${scaledWidth}w`;
      })
      .join(', ');
  };

  return {
    imageProps: {
      src,
      width,
      height,
      quality,
      loading: priority ? 'eager' : 'lazy',
      srcSet: generateSrcSet(),
      placeholder: placeholder === 'blur' ? (blurDataURL || generatedBlurUrl) : undefined,
    },
    isLoaded,
    error,
  };
} 