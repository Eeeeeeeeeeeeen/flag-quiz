import { Table, TableCaption, Tbody, Td, Th, Thead, Tr, Image } from "@chakra-ui/react";

const SkippedCountries = ({ countries }) => {
    return (
        <>
            {countries && countries.length > 0 &&
                <Table style={{ scrollbarWidth: "thin" }} display="block" maxH="500" overflowY="auto">
                    <TableCaption placement="top">Countries you skipped</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>
                                Flag

                            </Th>
                            <Th>
                                Country Name
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody h="130" maxH="130" overflowY="scroll">
                        {countries.map((country) => (
                            <Tr key={country[0].name}>
                                <Td>
                                    <Image src={country[0].flag} maxHeight="40px" />
                                </Td>
                                <Td>
                                    {country[0].name}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            }
        </>
    )
}

export default SkippedCountries;