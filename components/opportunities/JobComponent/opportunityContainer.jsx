import { Box } from "@chakra-ui/react";
import OpportunityDetails from "./opportunityDetails";
import OpportunitiesLogo from "./opportunityLogo";
import OpportunityModel from "./opportunityModel";

const OpportunityContainer = ({
    "Opportunity Type": opportunityType,
    "Opportunity Description": opportunityDescription,
    "Opportunity Name": opportunityName,
    "Partner": partner,
    "Opportunity Status": opportunityStatus,
    "Start Date": startDate,
    "End Date": endDate,
    "Opportunity URL": opportunityUrl
    }
) => {
    return (
        <Box p={4} className="drop-shadow-lg border-solid border-[1px] border-[#B3B3B3]">
            <OpportunitiesLogo type={opportunityType}/>
            <OpportunityDetails opportunityName={opportunityName} opportunityType={opportunityType} partner={partner}/>
            <OpportunityModel />
        </Box>
    )
};

export default OpportunityContainer;