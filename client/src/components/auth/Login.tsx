import React, { useState, ChangeEvent } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);

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

  const handleSubmit = () => {};

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
      >
        Login
      </Button>

      <Button
        colorScheme={"red"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={(e) => setUser({email: "eddybruv@example.com", password: "123456"})}
      >
        Guest user credentials
      </Button>
    </VStack>
  );
};

export default Login;
