// @ts-nocheck
// Disabled TS Type checking as PublicKey can be null and i couldn't work out how to handle it properly!

"use client";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import * as bs58 from "bs58";
import { Cluster } from "@solana/web3.js";
import * as token from "@solana/spl-token";
import React, { useState } from "react";
import {
  generateSigner,
  percentAmount,
  signerIdentity,
  createSignerFromKeypair,
  publicKey,
} from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import type { Context, PublicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  fromWeb3JsInstruction,
  toWeb3JsPublicKey,
} from "@metaplex-foundation/umi-web3js-adapters";
import {
  createV1,
  mintV1,
  TokenStandard,
  printSupply,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import {
  Heading,
  Box,
  Text,
  Center,
  Link,
  Input,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Container,
  Button,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type FormValues = {
  network: Cluster;
  name: string;
  symbol: string;
  uri: string;
  amount: number;
  decimals: number;
};

export default function Home() {
  const { connected, wallet, publicKey, wallets } = useWallet();
  const [data, setData] = React.useState({});
  const [result, setResult] = React.useState<any[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    console.log(wallet);
    setData(formData);
    console.log(formData);
    const connection = new web3.Connection(
      web3.clusterApiUrl(formData.network)
    );
    console.log(`Connection Created to ${formData.network}`);
    const umi = createUmi(connection).use(mplTokenMetadata());
    console.log(`Connection to umi created`);
    const mint = generateSigner(umi);
    console.log(
      `Generated new Mint Account with Secret Key: [${mint.secretKey}] & Public Key: ${mint.publicKey}`
    );
    console.log(
      `Oh shit it worked! Check out https://explorer.solana.com/address/${mint.publicKey}?cluster=${formData.network}`
    );

    umi.use(walletAdapterIdentity(wallet!.adapter));
    console.log(`Setup umi with wallet adapter`);

    await createV1(umi, {
      mint,
      authority: umi.identity,
      name: formData.name,
      symbol: formData.symbol,
      uri: formData.uri,
      sellerFeeBasisPoints: percentAmount(0),
      tokenStandard: TokenStandard.Fungible,
      decimals: formData.decimals,
    })
      .sendAndConfirm(umi)
      .then((result) => {
        const txSig = bs58.encode(result.signature);
        console.log(result);
        console.log(txSig);
        console.log(
          `Oh shit it worked! Check out https://explorer.solana.com/tx/${txSig}?cluster=${formData.network}`
        );
      });

    await mintV1(umi, {
      mint: mint.publicKey,
      authority: umi.identity,
      amount: formData.amount,
      tokenOwner: publicKey,
      tokenStandard: TokenStandard.Fungible,
    })
      .sendAndConfirm(umi)
      .then((result) => {
        const txSig = bs58.encode(result.signature);
        console.log(result);
        console.log(txSig);
        console.log(
          `Oh shit it worked! Check out https://explorer.solana.com/tx/${txSig}?cluster=${formData.network}`
        );
      });
  };

  //TODO: Add full form validation with data types for each field and ensure a user can't fuck it up at https://react-hook-form.com/get-started#Applyvalidation

  return (
    <Box as="main">
      <Box as="section" color="#2496af" pb="4em" pt="1em">
        <Container>
          <Center>
            <Heading as="h1" textAlign={"center"}>
              The Solana Token Machine
            </Heading>
          </Center>
          <Text mt="1em">
            Your currently logged in wallet will be used as the{" "}
            <strong>Minting Authority</strong> and will own the token. The token
            minting process will create a new <strong>Mint Account</strong>, the
            secret key of which will be provided to you during the minting
            process.
          </Text>
          <Text mt="1em">
            If you get any value from this feel free to ping me some SOL or some
            of your sexy new token! My wallet public address is
            HpksWfTfABoBwPJ8ac8c6qvAewtNs5DyrDuZWMieCcfq
          </Text>
          <Text mt="1em">gl hf. 3rr.</Text>
          <Box mt="1em">
            <Link
              href="https://github.com/dholliday/bigdex-token-machine"
              isExternal
            >
              All source code for this can be found on GitHub.
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
          <Text mt="1em">Be nice, open source. Don&apos;t be a twat.</Text>
          <Alert mt="1em" status="error">
            <AlertIcon />
            <AlertTitle>
              MAKE SURE YOUR WALLET IS IN THE RIGHT NETWORK FIRST.
            </AlertTitle>
            <AlertDescription>
              This front-end code can&apos;t tell if your wallet is in devnet or
              mainnet! So sort that setting out first please.
            </AlertDescription>
          </Alert>
        </Container>
        {connected ? (
          <Container mt="2em">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={8}>
                <InputGroup>
                  <InputLeftAddon>Solana Network</InputLeftAddon>
                  <Select
                    {...register("network")}
                    placeholder="Select option"
                    isRequired
                  >
                    <option value="devnet">devnet</option>
                    <option value="mainnet-beta">mainnet-beta</option>
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon>Name</InputLeftAddon>
                  <Input
                    {...register("name")}
                    placeholder="Big Dex"
                    isRequired
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon>Symbol</InputLeftAddon>
                  <Input
                    {...register("symbol")}
                    placeholder="BIGDEX"
                    isRequired
                  />
                </InputGroup>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon>Metadata URI</InputLeftAddon>
                    <Input
                      placeholder="https://bigdex.lol/token/bigdex/token_metadata.json"
                      isRequired
                      {...register("uri")}
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
                    <Link href="/example_metadata.json" isExternal>
                      Example Metadata JSON file
                    </Link>
                  </FormHelperText>
                </FormControl>
                <InputGroup>
                  <InputLeftAddon>Amount</InputLeftAddon>
                  <Input
                    {...register("amount")}
                    placeholder="42069000000"
                    isRequired
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon>Decimals</InputLeftAddon>
                  <Input {...register("decimals")} placeholder="2" isRequired />
                </InputGroup>
                <Button
                  colorScheme="pink"
                  size="lg"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  🍬🍬🍬 MINT 🍬🍬🍬
                </Button>
              </VStack>
            </form>
            <Box>
              {/* Results go here */}
              <Heading as="h2" size="md">
                Minting Results
              </Heading>
            </Box>
          </Container>
        ) : (
          <Container>
            <Alert mt="1em" status="error">
              <AlertIcon />
              Please connect your wallet. Otherwise this will be a little
              difficult...
            </Alert>
          </Container>
        )}
      </Box>
    </Box>
  );
}
