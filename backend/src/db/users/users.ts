import { connection } from "../connection";

import { selectCountOfUsersTemplate, selectUsersTemplate, selectAddressByUserIdTemplate } from "./query-templates";
import { User, Address } from "./types";

// function to get address by id
export const getAddressByUserId = (userId: number): Promise<Address | null> =>
  new Promise((resolve, reject) => {
    connection.get<{ street?: string; state?: string; city?: string; zipcode?: string }>(
      selectAddressByUserIdTemplate,
      [userId],
      (error, result) => {
        if (error) {
          reject(error);
        }
        if (!result) {
          resolve(null);
        } else {
          
          const address = {
            street: result.street || "",
            state: result.state || "",
            city: result.city || "",
            zipcode: result.zipcode || "",
          };
          resolve(address);
        }
      }
    );
  });

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(selectCountOfUsersTemplate, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.count);
    });
  });

export const getUsers = (pageNumber: number, pageSize: number): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<User>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
