import {
  SimpleGrid,
  Box,
  Text,
  Divider,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ImageData, ImageResults } from "../../types";

interface Props {
  data: ImageResults;
}

const ImageGrid: React.FC<Props> = ({ data, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState<ImageData | undefined>(
    undefined
  );
  const { unsplash, pexels } = data;

  return (
    <Box w="100%">
      <Box>
        <Text fontSize="2xl">Unsplash Results</Text>
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={"40px"}>
          {unsplash.map((item, idx) => {
            return (
              <Box
                p={"10px"}
                cursor="pointer"
                onClick={() => {
                  setIsModalOpen(true);
                  setClickedItem(item);
                }}
              >
                <Image
                  key={idx}
                  src={item.url}
                  alt={item.alt}
                  width="100%"
                  height="200px"
                  objectFit={"cover"}
                  borderRadius="4px"
                />
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>

      <Divider orientation="horizontal" m={"20px 0px"} />
      <Box>
        <Text fontSize="2xl">Pexels Results</Text>
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={"40px"}>
          {pexels.map((item, idx) => {
            return (
              <Box
                p={"10px"}
                cursor="pointer"
                onClick={() => {
                  setIsModalOpen(true);
                  setClickedItem(item);
                }}
              >
                <Image
                  key={idx}
                  src={item.url}
                  alt={item.alt}
                  width="100%"
                  height="200px"
                  objectFit={"cover"}
                  borderRadius="4px"
                />
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setClickedItem(undefined);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {clickedItem && (
              <Image src={clickedItem.url} alt={clickedItem.alt} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageGrid;
