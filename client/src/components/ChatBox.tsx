import React from "react";
import { ChatState } from "../context/ChatProvider";
import { IUser } from "../types/user.types";
import { Box } from "@chakra-ui/react";

const ChatBox = () => {
  const { selectedChat } = ChatState() as any;
  console.log(selectedChat)
  return (
    <div>
      <Box display={{ base: selectedChat.length ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDirection={"column"}
        p={3}
        bg="white"
        width={{base: "100%", md:"68%"}}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        Single Chat
      </Box>
    </div>
  );
};

export default ChatBox