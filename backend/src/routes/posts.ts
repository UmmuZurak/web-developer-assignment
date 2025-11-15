import { Router, Request, Response } from "express";
import { getPosts, deletePostById, addPost } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

// Endpoint to create a new post
router.post("/", async (req: Request, res: Response) => {
  const { userId, title, body } = req.body;
  if (!userId || !title || !body) {
    res.status(400).send({ error: "userId, title, and body are required" });
    return;
  }
  if (typeof userId !== "number" || typeof title !== "string" || typeof body !== "string") {
    res.status(400).send({ error: "Invalid input types" });
    return;
  }
  if (title.trim().length === 0 || body.trim().length === 0) {
    res.status(400).send({ error: "Title and body cannot be empty" });
    return;
  }
  try {
    const postId = await addPost(userId, title.trim(), body.trim());
    res.status(201).send({ message: "Post created successfully", postId });
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }
});

// Endpoint to delete a post by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  if (!postId || isNaN(postId)) {
    res.status(400).send({ error: "Invalid post ID" });
    return;
  }
  try {
    const deleted = await deletePostById(postId);
    if (deleted) {
      res.status(200).send({ message: "Post deleted successfully" });
    } else {
      res.status(404).send({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete post" });
  }
});

export default router;
