import React from "react";
import { Box } from "@chakra-ui/react";
import { IUser } from "../../types/user.types";
import { CloseIcon } from "@chakra-ui/icons";

interface Props {
  user: IUser["user"]["data"];
  handleFunction: () => void;
}

const UserBadgeItem = ({ handleFunction, user }: Props) => {
  return (
    <Box
      px={2}
      py={2}
      borderRadius={"lg"}
      m={1}
      mb={2}
      bg={"purple"}
      color={"white"}
      fontSize={12}
      cursor={"pointer"}
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
