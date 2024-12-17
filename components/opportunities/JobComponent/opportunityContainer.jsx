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
        <Box py={8} px={8} className="shadow-md border-solid border-[1px] border-[#B3B3B3] border-[filter: blur(4px)]">
            <OpportunitiesLogo type={opportunityType} />
            <Box className="place-items-center">
                <OpportunityDetails opportunityName={opportunityName} opportunityType={opportunityType} partner={partner} />
                <OpportunityModel />
            </Box>
        </Box>
    )
};

export default OpportunityContainer;