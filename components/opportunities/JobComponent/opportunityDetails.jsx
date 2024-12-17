import { Box } from "@chakra-ui/react";

const OpportunityDetails = ({ opportunityName, partner, opportunityType }) => {

    return (
        <Box className="pb-5">
            <p className=" font-extrabold max-w-[15em] text-2xl">{opportunityName}</p>
            <p className=" font-[400] text-xl">{partner}</p>
            <p className=" font-[200] text-base">{opportunityType}</p>
        </Box>
    )
}

export default OpportunityDetails;