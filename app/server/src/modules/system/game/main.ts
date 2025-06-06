import { users } from "./users.ts";

export const game = () => {
  const $users = users();

  return {
    users: $users,
  };
};
