import { Box } from "@chakra-ui/react";
import OpportunityDetails from "./opportunityDetails";
import OpportunitiesLogo from "./opportunityLogo";
import { OpportunityModal } from "./opportunityModel/index.jsx";

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
        <Box py={8} className="shadow-md border-solid border-[1px] border-[#B3B3B3] border-[filter: blur(4px)] w-[16rem] p-10">
            <OpportunitiesLogo type={opportunityType} />
            <OpportunityDetails opportunityName={opportunityName} opportunityType={opportunityType} partner={partner} />
            <Box className="place-items-center">
                <OpportunityModal />
            </Box>
        </Box>
    )
};

export default OpportunityContainer;