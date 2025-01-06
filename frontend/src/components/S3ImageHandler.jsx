import React, { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';

const S3ImageHandler = ({
  imagePath,
  alt,
  roundedTop,
  objectFit,
  height,
  width,
  transition,
}) => {
  const [imageError, setImageError] = useState(false);

  const getS3Url = path => {
    if (!path) return null;

    // If it's already a full URL, just clean up any duplicate media segments
    if (path.startsWith('http')) {
      return path.replace(/\/media\/media\//g, '/media/');
    }

    // Clean the path:
    // 1. Remove all leading/trailing slashes
    // 2. Remove any standalone 'media' segments
    // 3. Ensure single slashes between segments
    const cleanPath = path
      .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
      .replace(/^media\/|\/media$/g, '') // Remove media at start/end
      .replace(/\/media\//g, '/') // Remove media in middle
      .replace(/\/+/g, '/'); // Replace multiple slashes with single

    // Construct the full S3 URL
    return `https://mikhail-bonsai.s3.us-east-1.amazonaws.com/media/${cleanPath}`;
  };

  const handleError = () => {
    // Log both the original path and the computed URL for debugging
    console.log(`Original path: ${imagePath}`);
    console.log(`Computed URL: ${getS3Url(imagePath)}`);
    setImageError(true);
  };

  // If there's an error or no image path, show placeholder
  if (imageError || !imagePath) {
    return (
      <Box
        height={height}
        width={width}
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        roundedTop={roundedTop}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#A0AEC0' }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </Box>
    );
  }

  return (
    <Image
      src={getS3Url(imagePath)}
      alt={alt}
      roundedTop={roundedTop}
      objectFit={objectFit}
      height={height}
      width={width}
      transition={transition}
      onError={handleError}
    />
  );
};

export default S3ImageHandler;
