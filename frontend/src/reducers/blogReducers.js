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

// Blog Post Create Reducer
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

// Blog Post Delete Reducer
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
      return { loading: true, post: {} }; // Set loading to true when fetching starts
    case BLOG_POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload }; // Set loading to false and update post
    case BLOG_POST_DETAILS_FAIL:
      return { loading: false, error: action.payload }; // Set loading to false on failure
    default:
      return state;
  }
};

// Blog Post Like/Unlike Reducer
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

// Blog Create Comment Reducer
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

// Blog Get Comments Reducer
export const blogGetCommentsReducer = (
  state = { comments: [], loading: true },
  action
) => {
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

// Blog List My Reducer
export const blogListMyReducer = (
  state = { posts: [], loading: true },
  action
) => {
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

// Blog List Reducer
export const blogListReducer = (
  state = { posts: [], loading: true },
  action
) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true, posts: [] };
    case BLOG_LIST_SUCCESS:
      return { loading: false, posts: action.payload.results };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_POST_UPDATE_IN_LIST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};
