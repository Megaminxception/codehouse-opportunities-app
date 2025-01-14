"use client";

import { useState, useEffect } from "react";
import {PartnerModal} from "@/components/partnerModal";

import {

  Flex,
  Center,
  Textarea,
  Input,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";

export default function Partners() {
  const [isPartnerModalOpen, setPartnerModalOpen] = useState(false);
  const onOpenModal = () => setPartnerModalOpen(true);
  const onCloseModal = () => setPartnerModalOpen(false);

  return (
    <Flex textAlign="center" align="center" border="2px solid red" minH="100vh" justify="center" w="full">
      <button onClick={onOpenModal} >Open</button>
        <PartnerModal open={isPartnerModalOpen} onCloseModal={onCloseModal} title="ABC" partnerTypes="Technology" tier="Platinum" involvedInPrograms="Yes" location="New York, NY USA" about="We're dedicated to the ABC's and support Alphabet services through various program initiatives. Join us on our journey." website="abc.co"/>
    </Flex>
  )
}