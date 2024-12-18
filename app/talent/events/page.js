"use client";
import { Box, Center, Container, Flex } from "@chakra-ui/react";
import Calendar from 'react-calendar';
import { useState } from 'react'
// import 'react-calendar/dist/Calendar.css';

export default function Events() {

  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to update the state when a date is selected
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };
  
  return ( 
    <>
      <Flex bg="primaryWhite" minH="100vh" justify="center" align="center">
        {/* <p className="text-black">events page</p> */}
        <Container>
          <div>
          {/* Calendar component with onChange handler */}
          <Calendar 
            onChange={handleDateChange} 
            value={selectedDate} 
          />
          {/* Display the selected date */}
          <p>Selected Date: {selectedDate.toDateString()}</p>
        </div>
          </Container>
      </Flex>

    </>
  );
};