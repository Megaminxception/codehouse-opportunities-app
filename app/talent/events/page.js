"use client";

import { useState, useEffect } from "react";
import EventItem from "@/components/EventItem";
import { Flex, Text, Input, Box, Container, Center } from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Events() {
  const [searchValue, setSearchValue] = useState("");
  const [hosts, setHosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to update the state when a date is selected
  const handleDateChange = (date) => {
    date = date.toISOString();
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  const fetchEvents = async (url, options = {}) => {
    try {
      const headers = {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers, // Merge with any existing headers passed in options
      };

      const response = await fetch(url, { ...options, headers });
  
      // Throw an error if the response was not 2xx
      if (!response.ok) {
        throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)
      }
  
      // Check the content type to determine how to parse the response
      const isJson = (response.headers.get('content-type') || '').includes('application/json')
      let data = isJson ? await response.json() : await response.text()
  
      // return a tuple: [data, error]
      return [data, null]; 
    }
    catch (error) {
      // if there was an error, log it and return null
      console.error(error.message);
  
      // return a tuple: [data, error]
      return [null, error]; 
    }
  }

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
          throw new Error(
            `Error fetching partners: ${partnersResponse.status}`
          );
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
    fetchEvents(`https://api.airtable.com/v0/${BASE_ID}/Events`)
    .then(([data, error]) => {
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        // Map through records array and console log each record and field info
        data.records.map((record, index) => {
          console.log(`Record ${index + 1}:`, record);
          console.log(`Record ${index + 1} ID:`, record.id);
          console.log(`Record ${index + 1} createdTime:`, record.createdTime);
          for (const [key, value] of Object.entries(record.fields)) {
            console.log(`${key}:`, value);
          }
        });
      }
    });
  }, []);

  // Rendered Information
  const filteredEvents = events.filter((event) => {
    // Create a regex to match the selectedDate
    const regex = new RegExp(`^${selectedDate.split("T")[0]}$`);
  
    // Check if the event start date matches the selectedDate
    return regex.test(event.startDate);
  });
  
  console.log("Filtered Events:", filteredEvents);

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
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
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
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500",
              }}
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
        <Center>
          {/* Calendar component with onChange handler */}
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </Center>
      </Box>

      {/* Event Items */}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Flex>
  );
};