import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/api/chats");
      setChats(data);
    };
    fetchData();
  }, []);

  return <div>
    {
      chats.map(chat => <div>{chat.chatName}</div>)
    }
  </div>;
};

export default ChatPage;
