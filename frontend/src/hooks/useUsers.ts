import { useQuery } from "@tanstack/react-query";
import api from "../api";

export function useUsers(pageNumber: number, pageSize: number) {
  return useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: () => api.users.fetchUsers(pageNumber, pageSize),
  });
}

export function useUserPosts(userId: number) {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => api.users.fetchUserPosts(userId),
    enabled: !!userId,
  });
}
