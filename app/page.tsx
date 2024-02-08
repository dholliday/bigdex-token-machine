"use client";

import { Heading, Box, Text, Center, Link, Image } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <Box as="main">
      <Box as="section" bg="#2496af" color="white" pb="4em" pt="1em">
        <Center>
          <Text fontSize="8em">BIGDEX TOKEN MACHINE</Text>
        </Center>
        <Center>
          <Text pt="1em" fontSize="2em">
            Create a fucking token dickhead.
          </Text>
        </Center>
        <Box mt="2em" color="purple" fontWeight="900">
          <Center></Center>
        </Box>
      </Box>
    </Box>
  );
}
