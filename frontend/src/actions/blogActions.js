import axios from 'axios';
import {
  BLOG_POST_CREATE_REQUEST,
  BLOG_POST_CREATE_SUCCESS,
  BLOG_POST_CREATE_FAIL,
  BLOG_POST_DELETE_REQUEST,
  BLOG_POST_DELETE_SUCCESS,
  BLOG_POST_DELETE_FAIL,
  BLOG_POST_DETAILS_REQUEST,
  BLOG_POST_DETAILS_SUCCESS,
  BLOG_POST_DETAILS_FAIL,
  BLOG_POST_LIKE_UNLIKE_REQUEST,
  BLOG_POST_LIKE_UNLIKE_SUCCESS,
  BLOG_POST_LIKE_UNLIKE_FAIL,
  BLOG_POST_UPDATE_IN_LIST,
  BLOG_CREATE_COMMENT_REQUEST,
  BLOG_CREATE_COMMENT_SUCCESS,
  BLOG_CREATE_COMMENT_FAIL,
  BLOG_GET_COMMENT_REQUEST,
  BLOG_GET_COMMENT_SUCCESS,
  BLOG_GET_COMMENT_FAIL,
  BLOG_LIST_MY_REQUEST,
  BLOG_LIST_MY_SUCCESS,
  BLOG_LIST_MY_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
} from '../constants/blogConstants';

const API_URL = import.meta.env.VITE_API_URL;

// Get all blog posts
export const listBlogPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, // Add the token to the request
      },
    };

    const { data } = await axios.get(`${API_URL}blog/`, config);

    dispatch({
      type: BLOG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Get a single blog post
export const getBlogPostDetails = id => async dispatch => {
  try {
    dispatch({ type: BLOG_POST_DETAILS_REQUEST });

    const { data } = await axios.get(`${API_URL}blog/${id}/`);
    dispatch({
      type: BLOG_POST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Create a new blog post
export const createBlogPost = formData => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_POST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}blog/create/`,
      formData,
      config
    );

    dispatch({
      type: BLOG_POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Delete a blog post
export const deleteBlogPost = id => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_POST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${API_URL}blog/${id}/delete/`, config);

    dispatch({
      type: BLOG_POST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: BLOG_POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Like or Unlike a blog post
export const likeUnlikeBlogPost = id => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_POST_LIKE_UNLIKE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${API_URL}blog/${id}/like/`, {}, config);

    dispatch({
      type: BLOG_POST_LIKE_UNLIKE_SUCCESS,
      payload: data.post,
    });

    // Dispatch an action to update the blog list with the updated post
    dispatch({
      type: BLOG_POST_UPDATE_IN_LIST,
      payload: data.post, // Updated post
    });
  } catch (error) {
    dispatch({
      type: BLOG_POST_LIKE_UNLIKE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Create a comment on a blog post
export const createComment =
  (postId, content) => async (dispatch, getState) => {
    try {
      dispatch({ type: BLOG_CREATE_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}blog/${postId}/comment/`,
        { content },
        config
      );

      dispatch({
        type: BLOG_CREATE_COMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_CREATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// Get comments for a blog post
export const getComments = postId => async dispatch => {
  try {
    dispatch({ type: BLOG_GET_COMMENT_REQUEST });

    const { data } = await axios.get(`${API_URL}blog/${postId}/comments/`);

    dispatch({
      type: BLOG_GET_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_GET_COMMENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Get logged in user's blog posts
export const listMyBlogPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}blog/myposts/`, config);

    dispatch({
      type: BLOG_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
