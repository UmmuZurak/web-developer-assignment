import { connection } from "../connection";
import { selectCountOfUsersTemplate, selectUsersTemplate, selectAddressByUserIdTemplate } from "./query-templates";
import { User, Address } from "./types";

// Function to get address by user id
export const getAddressByUserId = (userId: number): Promise<Address | null> =>
  new Promise((resolve, reject) => {
    try {
      const stmt = connection.prepare(selectAddressByUserIdTemplate);
      const result = stmt.get(userId) as any;
      
      if (!result) {
        resolve(null);
      } else {
        const address: Address = {
          street: result.street || "",
          state: result.state || "",
          city: result.city || "",
          zipcode: result.zipcode || "",
        };
        resolve(address);
      }
    } catch (error) {
      reject(error);
    }
  });

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      const stmt = connection.prepare(selectCountOfUsersTemplate);
      const result = stmt.get() as any;
      resolve(result.count);
    } catch (error) {
      reject(error);
    }
  });

export const getUsers = (pageNumber: number, pageSize: number): Promise<User[]> =>
  new Promise((resolve, reject) => {
    try {
      const stmt = connection.prepare(selectUsersTemplate);
      const results = stmt.all(pageNumber * pageSize, pageSize);
      resolve(results as User[]);
    } catch (error) {
      reject(error);
    }
  });