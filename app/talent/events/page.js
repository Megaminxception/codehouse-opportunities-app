"use client";

import { useState, useEffect } from "react";
import { Flex, Text, Input, Box, Button } from "@chakra-ui/react";

export default function Events() {
  const [searchValue, setSearchValue] = useState("");
  const [hosts, setHosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching events and hosts...");

        // Fetch Events Table
        const eventsResponse = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/Events`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
          }
        );

        if (!eventsResponse.ok) {
          throw new Error(`Error fetching events: ${eventsResponse.status}`);
        }

        const eventsData = await eventsResponse.json();
        setEvents(
          eventsData.records.map((record) => ({
            id: record.id,
            EventName: record.fields["Event Name"],
            EventDate: record.fields["Event Start Date "],
            EventEndTime: record.fields["Event End Date "],
            EventDescription: record.fields["Event Description "],
            EventLocation: record.fields["Event Location "],
            EventHost: record.fields["Host (Link from Partners)"]?.[0] || "Unknown",
            EventURL: record.fields["Event URL"],
          }))
        );

        // Fetch Hosts
        const partnersResponse = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/Partners`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
          }
        );

        if (!partnersResponse.ok) {
          throw new Error(`Error fetching partners: ${partnersResponse.status}`);
        }

        const partnersData = await partnersResponse.json();
        const partnerMap = {};
        partnersData.records.forEach((record) => {
          partnerMap[record.id] = record.fields["Partner Name"];
        });

        setHosts(Object.values(partnerMap));

        // Map Event Hosts
        setEvents((prevEvents) =>
          prevEvents.map((event) => ({
            ...event,
            EventHost: partnerMap[event.EventHost] || "Unknown Host",
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Flex
      bg="primaryWhite"
      minH="100vh"
      justify="flex-start"
      align="center"
      direction="column"
      pt={24}
      fontFamily="var(--font-mulish)"
    >
      {/* Header Section */}
      <Box mb={8} textAlign="center">
        <Text as="h1" fontSize="34px" fontWeight="900" color="black">
          Events
        </Text>
        <Text
          fontSize="24px"
          color="black"
          textAlign="center"
          maxW="400px"
          mx="auto"
          lineHeight="1.2"
        >
          Search for jobs, funding, and more from CodeHouse sponsors.
        </Text>
      </Box>

      {/* Search and Filter Section */}
      <Box width="100%" maxW="600px">
        {/* Search Input */}
        <Box mb={6} position="relative" textAlign="center">
          <Input
            placeholder="Search by Event Name"
            size="md"
            borderRadius="full"
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            px={4}
            pr={10}
            color="black"
            _placeholder={{ color: "black" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <Box
              as="button"
              position="absolute"
              right="12px"
              top="50%"
              transform="translateY(-50%)"
              bg="transparent"
              fontSize="14px"
              color="black"
              _hover={{ color: "gray.700" }}
              aria-label="Clear search"
              onClick={() => setSearchValue("")}
            >
              X
            </Box>
          )}
        </Box>

        {/* Host Filter */}
        <Flex direction="column" align="center">
          <Box width="200px" textAlign="left">
            <Text fontSize="14px" fontWeight="medium" mb={2} color="gray.700">
              Host
            </Text>
            <Box
              as="select"
              size="md"
              borderRadius="md"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              p={2}
              width="100%"
              color="black"
              _hover={{ borderColor: "gray.400" }}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
            >
              {loading ? (
                <option>Loading hosts...</option>
              ) : hosts.length > 0 ? (
                <>
                  <option value="all">All</option>
                  {hosts.map((host, index) => (
                    <option key={index} value={host}>
                      {host}
                    </option>
                  ))}
                </>
              ) : (
                <option disabled>No hosts found</option>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>

      {events.map((event) => {
  const startDate = event.EventDate ? new Date(event.EventDate) : null;

  const formattedDate = startDate
    ? `${startDate.toLocaleString("default", { month: "short" })} ${startDate.getDate()}`
    : "N/A";

  return (
    <Box
      key={event.id}
      bg="white"
      borderRadius="sm"
      boxShadow="sm"
      p={4} 
      mb={4} 
      width="90%"
      maxW="700px"
      mx="auto"
      display="flex"
      alignItems="center"
      minH="100px"
    >
     {/* Date Circle */}
<Box
  bg="gray.800"
  color="white"
  textAlign="center"
  borderRadius="full"
  w="60px"
  h="60px"
  display="flex"
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  mr={5}
>
  {startDate ? (
    <>
      <Text fontSize="xl" fontWeight="bold" lineHeight="1">
        {startDate.getDate()}
      </Text>
      <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" mt={0.5}>
        {startDate.toLocaleString("default", { month: "short" })}
      </Text>
    </>
  ) : (
    <>
      <Text fontSize="xl" fontWeight="bold">TBD</Text>
    </>
  )}
</Box>


   {/* Event Details */}
<Flex flex="1" align="flex-start" direction="column">
  {/* Event Title */}
  <Text fontWeight="bold" fontSize="lg" mb={0.5} color="black" lineHeight="1.2">
    {event.EventName}
  </Text>

  {/* Event Date */}
  <Text fontSize="sm" color="black" mb={0.5} lineHeight="1.2">
    {formattedDate}
  </Text>

  {/* Event Host */}
  <Text fontSize="sm" color="black" mb={0.5} lineHeight="1.2">
   {event.EventHost}
  </Text>
</Flex>

      {/* Event Description */}
      <Box maxW="45%" pl={4} pr={4}>
        <Text fontSize="sm" color="gray.500" lineHeight="1.4">
          {event.EventDescription}
        </Text>
      </Box>

      {/* Attend Button */}
      <Button
        bg="gray.800"
        color="white"
        px={4}
        py={2}
        fontSize="sm"
        ml={4}
        borderRadius="sm"
        _hover={{ bg: "gray.700" }}
      >
        Attend
      </Button>
    </Box>
  );
})}


    </Flex>
  );
}
