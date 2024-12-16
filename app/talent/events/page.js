import { Box, Center, Flex } from "@chakra-ui/react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Events() {
  return (
    <Flex bg="primaryWhite" minH="100vh" justify="center" align="center">
      <p className="text-black">events page</p>
      <Calendar></Calendar>
    </Flex>
  );
};