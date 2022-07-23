import { Box, Button, Tooltip, Text, Menu, MenuButton } from "@chakra-ui/react";
import {} from "@chakra-ui/icons"
import React, { useState } from "react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [seachResult, setSeachResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      alignItems="center"
      bg={"white"}
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth={"5px"}
    >
      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Button variant="ghost">
          <i className="fas fa-search"></i>
          <Text display={{ base: "none", md: "flex" }} p="10px">
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize={"2xl"} fontFamily={"Work sans"}>Wait 4 U</Text>

      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon></BellIcon>
          </MenuButton>
        </Menu>
      </div>
    </Box>
  );
};

export default SideDrawer;
