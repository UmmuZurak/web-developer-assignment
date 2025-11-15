const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Delete a post
async function deletePost(postId: number) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}

// Add a post
async function addPost(userId: number, title: string, body: string) {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title, body }),
  });
  if (!res.ok) throw new Error("Failed to add post");
  return res.json();
}

const postsApi = {
  deletePost,
  addPost,
};

export default postsApi;