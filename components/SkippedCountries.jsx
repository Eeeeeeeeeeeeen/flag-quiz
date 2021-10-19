import { Stack, Flex, Image, Text, Spacer, Heading } from "@chakra-ui/react";
import Head from "next/head";

const SkippedCountries = ({ countries }) => {
  return (
    <>
      {countries && countries.length > 0 && (
        <>
          <Heading as="h3" size="md">
            Here's what you skipped
          </Heading>
          <Stack
            maxH="400"
            overflowY="auto"
            p="0 10"
            style={{ scrollbarWidth: "thin" }}
          >
            {countries.map((country) => (
              <Flex key={country[0].name.common} alignItems="center">
                <Image src={country[0].flags.svg} maxHeight="40px" />
                <Spacer />
                <Text mr="10px" fontWeight="bold">
                  {country[0].name.common}
                </Text>
              </Flex>
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default SkippedCountries;
