'use client';

import { Flex } from "@chakra-ui/react"
import { Jobs } from "@/components/opportunities/JobComponent/jobs"
import { OpportunityModal } from "@/components/opportunities/JobComponent/opportunityModel"
import { useState } from "react";

export default function Opportunities() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <Flex bg="primaryWhite" minH="100vh" justify="center" align="center" className="text-black" border='1px solid black'>
            <Jobs openModal={() => setIsModalOpen(true)} />
            <OpportunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Flex>
    )
}