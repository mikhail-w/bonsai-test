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

export const blogPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_POST_CREATE_REQUEST:
      return { loading: true };
    case BLOG_POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case BLOG_POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogPostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_POST_DELETE_REQUEST:
      return { loading: true };
    case BLOG_POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogPostDetailsReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case BLOG_POST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case BLOG_POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case BLOG_POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogPostLikeUnlikeReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_POST_LIKE_UNLIKE_REQUEST:
      return { loading: true };
    case BLOG_POST_LIKE_UNLIKE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case BLOG_POST_LIKE_UNLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogCreateCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_COMMENT_REQUEST:
      return { loading: true };
    case BLOG_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case BLOG_CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogGetCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case BLOG_GET_COMMENT_REQUEST:
      return { loading: true, comments: [] };
    case BLOG_GET_COMMENT_SUCCESS:
      return { loading: false, comments: action.payload };
    case BLOG_GET_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogListMyReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case BLOG_LIST_MY_REQUEST:
      return { loading: true };
    case BLOG_LIST_MY_SUCCESS:
      return { loading: false, posts: action.payload.results };
    case BLOG_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true, posts: [] };
    case BLOG_LIST_SUCCESS:
      return { loading: false, posts: action.payload.results };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
