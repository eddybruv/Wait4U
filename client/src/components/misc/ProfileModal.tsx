import React, { ReactNode } from "react";
import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { IUser } from "../../types/user.types";

interface Props {
  user?: IUser["user"]["data"];
  children?: ReactNode;
}

const ProfileModal = ({ user, children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          aria-label={""}
        />
      )}
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={"400px"}>
          <ModalHeader
            fontSize={"40px"}
            fontFamily="Work sans"
            display={"flex"}
            justifyContent="center"
          >
            {user?.name}
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent="center"
          >
            <Image
              borderRadius={"full"}
              boxSize="150px"
              src={user?.pic}
              alt={user?.name}
            />
            <Text fontSize={{ base: "28px", md: "30px" }}>
              Email: {user?.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
