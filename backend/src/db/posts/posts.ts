import { connection } from "../connection";
import { selectPostsTemplate, deletePostByIdTemplate, insertPostTemplate } from "./query-tamplates";
import { Post } from "./types";

// Function to add a new post
export const addPost = (userId: number, title: string, body: string): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.run(insertPostTemplate, [userId, title, body], function (error) {
      if (error) {
        reject(error);
      }
      resolve(this.lastID);
    });
  });

// Function to delete a post by ID
export const deletePostById = (postId: number): Promise<boolean> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostByIdTemplate, [postId], function (error) {
      if (error) {
        reject(error);
      }
      resolve(this.changes > 0);
    });
  });

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });
