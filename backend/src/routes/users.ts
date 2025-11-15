import { Router, Request, Response } from "express";

import { getUsers, getUsersCount, getAddressByUserId } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;
  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  const users = await getUsers(pageNumber, pageSize);
  // Fetch address for each user
  const usersWithAddress = await Promise.all(
    users.map(async (user) => {
      const address = await getAddressByUserId(user.id);
      return { ...user, address };
    })
  );
  res.send(usersWithAddress);
});

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

export default router;
