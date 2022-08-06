import React, { ChangeEvent, ReactNode, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { IUser } from "../../types/user.types";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

interface IProps {
  children: ReactNode;
}

const GroupChatModal = ({ children }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<IUser["user"]["data"][]>(
    []
  );
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { user } = ChatState() as IUser;
  const { chats, setChats } = ChatState() as any;

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResults(data);
    } catch {}
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New group chat create",
        status: "success",
        isClosable: true,
        position: "bottom",
      });
    } catch {
      toast({
        title: "Unable to create chat!",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDelete = (user: IUser["user"]["data"]) => {
    const temp = selectedUsers.filter(
      (sel: IUser["user"]["data"]) => sel._id !== user._id
    );
    setSelectedUsers(temp);
  };

  const handleGroup = (user: IUser["user"]["data"]) => {
    // @ts-ignore
    if (selectedUsers.includes(user)) {
      toast({
        title: "User already added",
        status: "warning",
        isClosable: true,
        position: "top",
      });
      return;
    }
    const select = [...selectedUsers, user];
    setSelectedUsers(select);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setGroupChatName(e.target.value)
                }
                placeholder={"Chat name"}
                mb={3}
              />
            </FormControl>
            <FormControl>
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
                placeholder={"Add users eg: Eddy, Sonia, Salome"}
                mb={3}
              />
            </FormControl>
            <Box width={"100%"} display={"flex"} flexWrap={"wrap"}>
              {selectedUsers?.map((user: IUser["user"]["data"]) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <div>loading</div>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user: IUser["user"]["data"], index) => (
                  <UserListItem
                    user={user}
                    key={index}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
