import { useQuery } from "react-query";
import { api } from "../../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

type GetUserResponse = {
  totalCount: number;
  users: User[];
}

interface UserMapProps {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get("/users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user: UserMapProps) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}
