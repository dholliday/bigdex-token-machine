"use client";

import {
  Heading,
  Box,
  Text,
  Center,
  Link,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  HStack,
  Container,
  Button,
  Select,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <Box as="main">
      <Box as="section" color="#2496af" pb="4em" pt="1em">
        <Container>
          <Center>
            <Heading textAlign={"center"}>$BIGDEX Solana Token Machine</Heading>
          </Center>
        </Container>
        <Container mt="2em">
          <VStack spacing={8}>
            <InputGroup>
              <InputLeftAddon>Solana Network</InputLeftAddon>
              <Select placeholder="Select option" isRequired>
                <option value="devnet">devnet</option>
                <option value="mainnet-beta">mainnet-beta</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Name</InputLeftAddon>
              <Input placeholder="Big Dex" isRequired />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Symbol</InputLeftAddon>
              <Input placeholder="BIGDEX" isRequired />
            </InputGroup>
            <FormControl>
              <InputGroup>
                <InputLeftAddon>Metadata URI</InputLeftAddon>
                <Input
                  placeholder="https://bigdex.lol/token/bigdex/token_metadata.json"
                  isRequired
                />
              </InputGroup>
              <FormHelperText>
                This needs to be a JSON file following the{" "}
                <Link
                  href="https://developers.metaplex.com/token-metadata/token-standard"
                  isExternal
                >
                  Metada Token Standard (The Fungible Asset Standard){" "}
                  <ExternalLinkIcon mx="2px" />
                </Link>
              </FormHelperText>
              <FormHelperText>
                <Link href="/example_metadata.json">
                  Example Metadata JSON file
                </Link>
              </FormHelperText>
            </FormControl>
            <InputGroup>
              <InputLeftAddon>Decimals</InputLeftAddon>
              <Input placeholder="2" isRequired />
            </InputGroup>
            <Button colorScheme="pink" size="lg">
              🍬🍬🍬 MINT 🍬🍬🍬
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
