import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);


  return <div>
    {
      chats.map(chat => <div>{chat.chatName}</div>)
    }
  </div>;
};

export default ChatPage;
