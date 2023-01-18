import {
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Button,
  Skeleton,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/react";
import { Search2Icon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import ImageGrid from "./components/ImageGrid";
import { useEffect, useState } from "react";
import { ImageResults } from "../types";
import useDebounce from "./hooks/useDebounce";
import axios from "axios";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ImageResults | undefined>(undefined);
  const { toggleColorMode, colorMode } = useColorMode();
  const debouncedSearchValue = useDebounce<string>(searchInput, 500);

  useEffect(() => {
    if (debouncedSearchValue) {
      setIsLoading(true);
      axios
        .get("http://localhost:8000/api/image/search", {
          params: {
            key: debouncedSearchValue,
          },
        })
        .then((resp) => {
          setIsLoading(false);
          setData(resp.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }
  }, [debouncedSearchValue]);

  const getNewResults = (page: number) => {
    if (debouncedSearchValue && page) {
      setIsLoading(true);
      axios
        .get("http://localhost:8000/api/image/next", {
          params: {
            key: debouncedSearchValue,
            next_page: page,
          },
        })
        .then((resp) => {
          setIsLoading(false);
          setData(resp.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }
  };

  return (
    <VStack padding={"24px"} spacing={"20px"}>
      <HStack>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<Search2Icon />} />
          <Input
            placeholder="Search Images"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </InputGroup>
        <Button variant="link" onClick={() => toggleColorMode()}>
          {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </HStack>
      {isLoading && (
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={"40px"}>
          {[...Array(20)].map((_) => {
            return <Skeleton height="200px" width={"400px"} />;
          })}
        </SimpleGrid>
      )}
      {!isLoading && data && (
        <>
          <ImageGrid data={data} />
          <HStack justifyContent={"space-between"} p={"10px"}>
            {data.page > 1 && (
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => getNewResults(data.page - 1)}
              >
                Prev
              </Button>
            )}

            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => getNewResults(data.page + 1)}
            >
              Next
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  );
}

export default App;
