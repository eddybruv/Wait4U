import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { IUser } from "../../types/user.types";
import { Avatar, Box, Text } from "@chakra-ui/react";

interface IProps {
  user: IUser["user"]["data"];
  handleFunction: () => void;
}

const UserListItem = ({ user, handleFunction }: IProps) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg={"#e8e8e8"}
      _hover={{
        background: "#38b2ac",
        color: "white",
      }}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      color={"black"}
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"pointer"}
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"xs"}>
          <b>Email : </b> {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
