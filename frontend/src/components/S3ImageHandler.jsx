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

    // Remove the full CloudFront URL if it's already in the path
    const cleanPath = path.replace(S3_BASE_URL, '');

    // Clean the path and ensure proper formatting
    const formattedPath = cleanPath
      .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
      .replace(/^media\/?/, '') // Remove 'media/' prefix if exists
      .replace(/\/+/g, '/'); // Replace multiple slashes with single

    // Ensure the path doesn't start with a slash
    const finalPath = formattedPath.startsWith('/')
      ? formattedPath.slice(1)
      : formattedPath;

    // Construct the full S3 URL ensuring 'media' is included only once
    return `${S3_BASE_URL}/media/${finalPath}`;
  };

  const handleError = () => {
    console.error(`Image failed to load: ${imagePath}`);
    setImageError(true);
  };

  // Placeholder component for failed/missing images
  const ImagePlaceholder = () => (
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

  if (imageError || !imagePath) {
    return <ImagePlaceholder />;
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
      loading="lazy"
    />
  );
};

export default S3ImageHandler;
