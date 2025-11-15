import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useUsers } from "../../hooks/useUsers";
import Loader from "../ui/loader";
import Error from "../ui/error";

// Define the structure of a user
interface UsersTable {
  name: string;
  email: string;
  address: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<UsersTable[]>([]);
  const [page, setPage] = useState(0);
  const limit = 4;
  const totalPages = 10;

  //fetch users from backend and display them
  const { data, isLoading, isError } = useUsers(page, limit);

  // Function to handle page change
  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  useEffect(() => {
    if (data && !isLoading) {
      // Format users data to include address as a single string
      const formattedUsers = data.map((user: any) => {
        const address = user.address
          ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zipcode}`
          : "N/A";
        return {
          name: user.name,
          email: user.email,
          address,
        };
      });

      // Update state with formatted users
      setUsers(formattedUsers);
    }
  }, [data, isLoading]);

  return (
    <div className="w-full grid gap-10">
      <h1 className="text-black-400 text-6xl">Users</h1>

      <Card className="w-full">
        <CardContent className="w-full p-0">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Error text="Failed to load users." />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full name</TableHead>
                    <TableHead>Email address</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u, i) => (
                    <TableRow key={i}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-2 text-sm justify-end">
        <Button variant="ghost" onClick={() => goToPage(page - 1)} disabled={page === 1}>
          &lt; Previous
        </Button>

        {[...Array(totalPages)].map((_, idx) => {
          const p = idx + 1;
          return (
            <Button
              key={p}
              variant={page === p ? "default" : "outline"}
              onClick={() => goToPage(p)}
              className={cn("w-10 h-8 p-0")}
            >
              {p}
            </Button>
          );
        })}

        <Button variant="ghost" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
          Next &gt;
        </Button>
      </div>
    </div>
  );
}
