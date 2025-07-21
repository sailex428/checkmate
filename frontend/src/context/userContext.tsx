import { createContext, type PropsWithChildren, useState } from "react";

type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
};

const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => null,
});

export const UserContextProvider = (props: PropsWithChildren) => {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
