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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <Box as="main">
      <Box as="section" color="#2496af" pb="4em" pt="1em">
        <Container>
          <Center>
            <Heading textAlign={"center"}>The Solana Token Machine</Heading>
          </Center>
          <Text mt="1em">
            Your currently logged in wallet will be used as the{" "}
            <strong>Minting Authority</strong> and will own the token. The token
            minting process will create a new <strong>Mint Account</strong>, the
            secret key of which will be provided to you during the minting
            process.
          </Text>
          <Text mt="1em">gl hf. 3rr.</Text>
          <Alert mt="1em" status="info">
            <AlertIcon />
            <Link
              href="https://github.com/dholliday/bigdex-token-machine"
              isExternal
            >
              All source code for this machine can be found on GitHub here
              <ExternalLinkIcon mx="2px" />
            </Link>{" "}
            Be nice, open source. Don&apos;t be a twat.
          </Alert>
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
                  Metada Token Standard (The Fungible Asset Standard)
                  <ExternalLinkIcon mx="2px" />
                </Link>{" "}
                hosted at a sensible public location. You pick!
              </FormHelperText>
              <FormHelperText>
                <Link href="/example_metadata.json">
                  Example Metadata JSON file
                </Link>
              </FormHelperText>
            </FormControl>
            <InputGroup>
              <InputLeftAddon>Amount</InputLeftAddon>
              <Input placeholder="42069000000" isRequired />
            </InputGroup>
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
