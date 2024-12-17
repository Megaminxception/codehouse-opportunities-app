import { Box } from "@chakra-ui/react";

const OpportunityDetails = ({opportunityName, partner, opportunityType}) => {

    return (
        <Box>
            <p>{opportunityName}</p>
            <p>{partner}</p>
            <p>{opportunityType}</p>
        </Box>
    )
}

export default OpportunityDetails;