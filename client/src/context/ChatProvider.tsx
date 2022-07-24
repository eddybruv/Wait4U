import {
  createContext,
  FC,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { IUser } from "../types/user.types";
import { useHistory } from "react-router-dom";

interface IComponent {
  children?: ReactNode;
}

const ChatContext = createContext<IUser | {}>({});

export const ChatProvider: FC<IComponent> = ({ children }: IComponent) => {
  const history = useHistory();
  const [user, setUser] = useState<IUser | {}>({});

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    const userInfo: IUser = data && JSON.parse(data);
    setUser(userInfo);

    if (!userInfo) {
      history?.push("/");
    }
  }, [history]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
