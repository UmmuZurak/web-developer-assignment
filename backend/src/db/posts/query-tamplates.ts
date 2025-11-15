export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

// Template to delete a post by ID
export const deletePostByIdTemplate = `
DELETE FROM posts WHERE id = ?
`;

// Template to insert a new post
export const insertPostTemplate = `
INSERT INTO posts (user_id, title, body, created_at)
VALUES (?, ?, ?, datetime('now'))
`;
