import { Stack, Flex, Image, Text, Spacer, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { FC } from "react";
import { Country } from "../pages";

interface SkippedCountriesProps {
  countries: Country[];
}

const SkippedCountries: FC<SkippedCountriesProps> = ({ countries }) => {
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
              <Flex key={country.name.common} alignItems="center">
                <Image src={country.flags.svg} maxHeight="40px" />
                <Spacer />
                <Text mr="10px" fontWeight="bold">
                  {country.name.common}
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
