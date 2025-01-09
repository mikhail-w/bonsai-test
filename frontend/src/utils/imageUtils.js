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
  const cleanMediaPath = (imagePath, baseURL) => {
  if (!imagePath) return null;

  // Ensure baseURL ends without a slash and imagePath starts without one
  const cleanBaseURL = baseURL.replace(/\/+$/, '');
  const cleanPath = imagePath.replace(/^\/+/, '').replace(/\/+/g, '/'); // Remove leading/trailing/multiple slashes

  // Construct full URL
  return `${cleanBaseURL}/${cleanPath}`;
};
