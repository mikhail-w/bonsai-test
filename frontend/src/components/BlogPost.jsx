import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Textarea,
  HStack,
} from '@chakra-ui/react';
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
    <Box p={5} mt={50}>
      <Heading>{post.content}</Heading>
      {post.image && <Image src={post.image} alt={post.content} />}
      <HStack mt={10}>
        <Text fontFamily={'lato'} fontWeight={800}>
          Created At:{' '}
        </Text>
        <Text fontFamily={'lato'} fontWeight={300}>
          {new Date(post.created_at).toLocaleString()}
        </Text>
      </HStack>

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
    </Box>
  );
}

export default BlogPost;
