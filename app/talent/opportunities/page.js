import { Flex } from "@chakra-ui/react";
import OpportunitiesFilter from "@/components/opportunities/OpportunitiesFilters";

export default function Opportunities() {
  return (
    <Flex bg="primaryWhite" minH="100vh" justify="center" align="center">
      <OpportunitiesFilter/>
    </Flex>
  );
}

