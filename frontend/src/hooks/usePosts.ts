import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.posts.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
}

export function useAddPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, title, body }: { userId: number; title: string; body: string }) =>
      api.posts.addPost(userId, title, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
}
