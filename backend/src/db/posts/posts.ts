import { connection } from "../connection";
import { selectPostsTemplate, deletePostByIdTemplate, insertPostTemplate } from "./query-tamplates";
import { Post } from "./types";

// Function to add a new post
export const addPost = (userId: number, title: string, body: string): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      const stmt = connection.prepare(insertPostTemplate);
      const info = stmt.run(userId, title, body);
      resolve(info.lastInsertRowid as number);
    } catch (error) {
      reject(error);
    }
  });

// Function to delete a post by ID
export const deletePostById = (postId: number): Promise<boolean> =>
  new Promise((resolve, reject) => {
    try {
      const stmt = connection.prepare(deletePostByIdTemplate);
      const info = stmt.run(postId);
      resolve(info.changes > 0);
    } catch (error) {
      reject(error);
    }
  });

// Function to get posts
export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    try {
      const stmt = connection.prepare(selectPostsTemplate);
      const results = stmt.all(userId);
      resolve(results as Post[]);
    } catch (error) {
      reject(error);
    }
  });