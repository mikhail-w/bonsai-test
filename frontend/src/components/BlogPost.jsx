import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Image, Button, Textarea } from '@chakra-ui/react';
import { getBlogPostDetails, createComment } from '../actions/blogActions';
import Comment from '../components/Comment'; // Comment component for displaying individual comments

function BlogPost({ post }) {
  const { id } = useParams();
  const postId = id;
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState('');
  const { userInfo } = useSelector(state => state.userLogin);
  const { comments } = post;
  // const { post, comments, isAuthenticated } = useSelector(state => state.blog);

  const handleCommentSubmit = () => {
    if (userInfo) {
      dispatch(createComment(post.id, commentContent)); // Submit the comment
      setCommentContent(''); // Clear the textarea
    } else {
      alert('Please log in to comment');
    }
  };

  return (
    <Box p={5}>
      <Heading>{post.content}</Heading>
      {post.image && <Image src={post.image} alt={post.content} />}
      <Text>{post.created_at}</Text>
      <Text>
        Likes: {post.likes_count} | Comments: {post.comments_count}
      </Text>

      {/* Display Comments */}
      <Box mt={5}>
        <Heading size="md">Comments</Heading>
        {comments &&
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </Box>

      {/* Comment Form */}
      {/* {userInfo && (
        <Box mt={5}>
          <Textarea
            placeholder="Add a comment"
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
          />
          <Button mt={2} onClick={handleCommentSubmit}>
            Post Comment
          </Button>
        </Box>
      )} */}
    </Box>
  );
}

export default BlogPost;
