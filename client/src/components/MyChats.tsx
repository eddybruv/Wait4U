import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { IUser } from "../types/user.types";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogic";
import GroupChatModal from "./misc/GroupChatModal";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState<IUser["user"]["data"]>();
  const { user } = ChatState() as IUser;
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState() as any;

  const toast = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    setLoggedUser(() => userData && JSON.parse(userData));
    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const { data } = await axios.get("/api/chat", config);
        setChats(data);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to load chats",
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
    fetchChats();
  }, [user.token]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      width={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        p={3}
        bg={"#f8f8f8"}
        width={"100%"}
        height={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat: any) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat === chat ? "#38b2ac" : "#e8e8e8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user.data, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
