"use client";

import { useState, useEffect } from "react";
import PartnerModal from "@/components/partnerModal";

import {
  
  Stack,
  Center,
  Textarea,
  Input,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";

export default function Partners() {
  return (
    <Stack textAlign="center" align="center" pt="120px" pb="274px">
          
            <Box textAlign="center">
              {/* <Heading> */}
                
            <PartnerModal/>
              {/* </Heading> */}
            </Box>
          </Stack>
  )
}