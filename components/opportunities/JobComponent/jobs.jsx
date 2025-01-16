import OpportunityContainer from "./opportunityContainer";
import { Grid } from "@chakra-ui/react";


const Jobs = ({ opportunitiesData = [] }) => {

  return (
    <>
      {
        opportunitiesData.map((opportunity) => (
          <OpportunityContainer key={opportunity.id} {...opportunity.fields} />
        ))
      }
    </>
  )
}

export default Jobs;