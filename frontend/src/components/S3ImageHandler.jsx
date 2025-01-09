import React, { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';

// Use the VITE_S3_PATH environment variable for the base URL
const S3_BASE_URL =
  import.meta.env.VITE_S3_PATH || 'https://d2v41dj0jm6bl1.cloudfront.net';

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

    // Clean the path to ensure consistent formatting
    const cleanPath = path
      .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
      .replace(/^media\/|\/media$/g, '') // Remove media at start/end
      .replace(/\/media\//g, '/') // Remove extra media segments
      .replace(/\/+/g, '/'); // Replace multiple slashes with single

    // Construct the full S3 URL
    return `${S3_BASE_URL}/media/${cleanPath}`;
  };

  const handleError = () => {
    console.error(`Image failed to load: ${imagePath}`);
    setImageError(true);
  };

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
        {/* Placeholder for failed image */}
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
