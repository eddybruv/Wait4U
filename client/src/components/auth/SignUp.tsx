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
  name: string;
  email: string;
  password: string;
  pic?: File;
}

const SignUp = () => {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    pic: undefined,
  });

  const [show, setShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          value={user?.name}
          placeholder="Enter name"
          onChange={handleChange}
        />
      </FormControl>

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

      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          <InputRightElement width={"4.5rem"}>
            <Button onClick={handleShow}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload photo</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          // @ts-ignore: Object is possibly 'null'
          onChange={(e) => setUser({ ...user, pic: e.target.files[0] })}
        />
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
