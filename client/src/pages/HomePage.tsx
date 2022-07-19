import React from "react";
import Login from "../components/auth/Login"
import SignUp from "../components/auth/SignUp";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display={"flex"}
        w="100%"
        p={3}
        bg={"white"}
        justifyContent="center"
        m={"40px 0 15px 0"}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <Text fontSize="3xl" fontFamily={"Work sans"}>
          Wait 4 U
        </Text>
      </Box>

      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth={"1px"}>
        <Tabs variant="soft-rounded">
          <TabList mb="1rem">
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
