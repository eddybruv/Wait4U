import React, { useState, ChangeEvent } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface IUser {
  name: string;
  email: string;
  password: string;
  pic?: File;
}

const SignUp = () => {
  const PRESET = "wait4u";

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    pic: undefined,
  });

  const [show, setShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleShow = () => {
    setShow((show) => !show);
  };

  const handlePostImage = (pic: File) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pic.type === "image/png" || pic.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", PRESET);
      data.append("cloud_name", "eddybruv");

      fetch("https://api.cloudinary.com/v1_1/eddybruv/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({ ...user, pic: data.url });
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async () => {
    setLoading(() => true);
    if (!user.name || !user.email || !user.password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (user.password !== confirmPassword) {
      toast({
        title: "Passwords don't match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios
        .post("/api/user", user, config)
        .then((data) => data.data);
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
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
          onChange={(e) => handlePostImage(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
