const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Fetch paginated users
async function fetchUsers(pageNumber: number, pageSize: number) {
  const res = await fetch(`${API_BASE_URL}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

// Fetch a user's posts
async function fetchUserPosts(userId: number) {
  const res = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

const usersApi = {
  fetchUsers,
  fetchUserPosts,
};

export default usersApi;
