import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBlogPosts } from '../actions/blogActions';

function BlogPage() {
  const dispatch = useDispatch();
  const blogPosts = useSelector(state => state.blogList);
  const { loading, error, posts } = blogPosts;
  console.log('Post:', posts.results);

  useEffect(() => {
    dispatch(listBlogPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Blog Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {posts.results.map(post => (
            <li key={post.id}>
              <h2>
                {post.user} - {post.content}
              </h2>
              <p>Likes: {post.likes_count}</p>
              <img src={post.image} alt="post" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BlogPage;
