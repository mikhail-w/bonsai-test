export const getImagePath = imagePath => {
  if (!imagePath) {
    console.log('No image path provided, using placeholder');
    return 'default/placeholder.jpg';
  }

  // If it's already a full S3 URL, return it as is
  if (imagePath.includes('amazonaws.com')) {
    console.log('Using existing S3 URL:', imagePath);
    return imagePath;
  }

  // Clean the path by removing any existing prefixes
  const cleanPath = imagePath
    .replace(/^media\//, '') // Remove leading media/
    .replace(/^products\//, '') // Remove leading products/
    .replace(/media\/products\//, '') // Remove full media/products/ path
    .replace(/media\//, ''); // Remove any remaining media/

  // Return just the clean filename
  return cleanPath;
};

// utils / imageUtils.js;
// export const getImagePath = url => {
//   if (!url) return '';

//   // If it's already a relative path, return as is
//   if (!url.includes('://')) {
//     return url;
//   }

//   try {
//     // Extract the path after the bucket name
//     const urlObj = new URL(url);
//     const pathParts = urlObj.pathname.split('/');
//     // Find the index of 'media' or 'products'
//     const mediaIndex = pathParts.findIndex(
//       part => part === 'media' || part === 'products'
//     );

//     if (mediaIndex !== -1) {
//       // Join the parts after 'media' or 'products'
//       return pathParts.slice(mediaIndex).join('/');
//     }

//     // Fallback to just the filename
//     return pathParts[pathParts.length - 1];
//   } catch (error) {
//     console.error('Error processing image path:', error);
//     return url.split('/').pop() || '';
//   }
// };
/**
 * Cleans and constructs image URLs for the application
 * Handles various input formats including:
 * - Full S3 URLs
 * - Relative paths with or without media prefix
 * - Default placeholder handling
 */

const S3_BUCKET = 'https://mikhail-bonsai.s3.us-east-1.amazonaws.com';

export const constructImageUrl = (imagePath, baseUrl = '') => {
  // Handle empty or undefined paths
  if (!imagePath) {
    console.log('No image path provided, using placeholder');
    return '/default/placeholder.jpg';
  }

  // If it's already a full S3 URL, return it as is
  if (imagePath.includes('amazonaws.com')) {
    console.log('Using existing S3 URL:', imagePath);
    return imagePath;
  }

  // Clean the path by removing any duplicate media prefixes
  const cleanPath = imagePath
    .replace(/^media\//, '') // Remove leading media/
    .replace(/^products\//, '') // Remove leading products/
    .replace(/^\//, ''); // Remove leading slash if present

  // Construct the final URL with the correct path structure
  // We only want to add the media/products/ prefix once
  const fullUrl = `${S3_BUCKET}/media/products/${cleanPath}`;

  console.log('Constructed final URL:', fullUrl);
  return fullUrl;
};

/**
 * Validates if an image URL is properly formatted
 * Useful for debugging image loading issues
 */
export const validateImageUrl = url => {
  if (!url) return false;

  // Check if it's a valid S3 URL structure
  if (url.includes('amazonaws.com')) {
    const pathSegments = url.split('/');
    // Ensure we don't have duplicate media/products segments
    const mediaCount = pathSegments.filter(
      segment => segment === 'media'
    ).length;
    const productsCount = pathSegments.filter(
      segment => segment === 'products'
    ).length;

    if (mediaCount > 1 || productsCount > 1) {
      console.warn(
        'Warning: URL contains duplicate media or products segments'
      );
      return false;
    }
  }

  return true;
};
