"use client";
import { Flex } from "@chakra-ui/react";
import OpportunitiesFilter from "@/components/opportunities/OpportunitiesFilters";
import { OpportunityModal } from "@/components/opportunities/JobComponent/opportunityModel"
import { Jobs } from "@/components/opportunities/JobComponent/jobs"
import { useEffect, useState } from "react";


export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchOpportunities = async () => {
      try{
        const result = await fetch(`https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Opportunities`, 
        { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` } })
        const data = await result.json()
        if (data){
          setOpportunities(data.records)
        }
      } catch(e){
        console.error(e)
      }
    }
    fetchOpportunities()
  }, [])

  return (
    <Flex bg="primaryWhite" minH="100vh" justify="center" align="center" direction="column">
      <OpportunitiesFilter/>
      <br></br>
      <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // 3 equal-width columns
      gap: "24px", // Spacing between items
      padding: "24px", // Padding around the grid
      width: "100%",
      maxWidth: "1200px", // Optional max width for the grid container
    }}>
        <Jobs opportunitiesData = {opportunities} openModal={() => setIsModalOpen(true)} />
      </div>
      <OpportunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Flex>
  );
}
