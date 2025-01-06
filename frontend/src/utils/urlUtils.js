/**
 * Cleans URL paths by removing duplicate media segments and normalizing slashes.
 * This function handles both full URLs and relative paths.
 *
 * @param {string} path - The original URL or path
 * @param {string} baseUrl - The base URL (optional)
 * @returns {string} - The cleaned and properly formatted URL
 */
export const cleanMediaPath = (path, baseUrl = '') => {
  if (!path) return '';

  // Remove leading/trailing slashes and clean up the path
  const cleanPath = path
    .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
    .replace(/\/media\/media\//g, '/media/') // Remove duplicate media segments
    .replace(/^media\/|\/media$/g, '') // Remove standalone media at start/end
    .replace(/\/+/g, '/'); // Replace multiple slashes with single

  // If it's already a full URL, just return the cleaned version
  if (path.startsWith('http')) {
    return path.replace(/\/media\/media\//g, '/media/');
  }

  // Combine base URL with cleaned path
  const combinedPath = baseUrl
    ? `${baseUrl.replace(/\/+$/, '')}/${cleanPath}`
    : cleanPath;

  // Ensure proper media prefix
  return combinedPath.includes('/media/')
    ? combinedPath
    : `${baseUrl}/media/${cleanPath}`;
};
