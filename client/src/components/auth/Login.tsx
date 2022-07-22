import React, { useState, ChangeEvent, MouseEvent } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const toast = useToast();
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const handleShow = () => {
    setShow((show) => !show);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!user.email || !user.password) {
      toast({
        title: "Please fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios
        .post("/api/user/login", user, config)
        .then((data) => data.data);

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          value={user?.email}
          placeholder="Enter email"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            value={user?.password}
            placeholder="Enter password"
            onChange={handleChange}
          />
          <InputRightElement width={"4.5rem"}>
            <Button onClick={handleShow}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        colorScheme={"red"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={(e: MouseEvent<HTMLButtonElement>) =>
          setUser({ email: "eddybruv@example.com", password: "123456" })
        }
      >
        Guest user credentials
      </Button>
    </VStack>
  );
};

export default Login;
