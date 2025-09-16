import { Image, useBreakpointValue } from '@chakra-ui/react';
import type { ImageProps } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface ResponsiveImageProps extends Omit<ImageProps, 'srcSet'> {
  src: string;
  srcSet?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
  sizes?: string;
  alt: string;
  fallbackSrc?: string;
}

const ResponsiveImage = ({
  src,
  srcSet,
  sizes = '100vw',
  alt,
  fallbackSrc,
  ...props
}: ResponsiveImageProps) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isError, setIsError] = useState(false);
  
  // Determine the appropriate image source based on breakpoints
  const responsiveSrc = useBreakpointValue({
    base: srcSet?.sm || src,
    sm: srcSet?.sm || src,
    md: srcSet?.md || srcSet?.sm || src,
    lg: srcSet?.lg || srcSet?.md || srcSet?.sm || src,
    xl: srcSet?.xl || srcSet?.lg || srcSet?.md || src,
    '2xl': srcSet?.['2xl'] || srcSet?.xl || srcSet?.lg || src,
  }) || src;

  // Handle image loading errors
  const handleError = () => {
    if (!isError) {
      setIsError(true);
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      }
    }
  };

  // Update the current source when the responsive source changes
  useEffect(() => {
    if (responsiveSrc && responsiveSrc !== currentSrc) {
      setCurrentSrc(responsiveSrc);
      setIsError(false);
    }
  }, [responsiveSrc, currentSrc]);

  // Generate srcSet string if provided
  const srcSetString = srcSet
    ? Object.entries(srcSet)
        .map(([breakpoint, url]) => `${url} ${breakpoint}`)
        .join(', ')
    : undefined;

  return (
    <Image
      src={currentSrc}
      srcSet={srcSetString}
      sizes={sizes}
      alt={alt}
      onError={handleError}
      loading="lazy"
      decoding="async"
      width="100%"
      height="auto"
      maxW="100%"
      {...props}
    />
  );
};

export default ResponsiveImage;
