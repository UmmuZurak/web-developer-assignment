import usersApi from "./users/users";
import postsApi from "./posts/posts";

const api = {
  users: usersApi,
  posts: postsApi,
};

export default api;