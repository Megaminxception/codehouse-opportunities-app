import OpportunityContainer from "./opportunityContainer";
import { Grid } from "@chakra-ui/react";

const opportunities = {
    "records": [
      {
        "id": "recXXXXXXX",
        "fields": {
          "Opportunity URL": "https://example.com/opportunity1",
          "Partner": "recPartnerID1",
          "Opportunity Name": "Software Engineering Internship",
          "Opportunity Status": "Active",
          "Opportunity Type": "Internship/Co-op",
          "Opportunity Description": "An exciting opportunity to intern with a leading software company.",
          "Start Date": "2024-06-01",
          "End Date": "2024-08-31",
          "Created At": "2023-12-13T10:00:00.000Z"
        },
        "createdTime": "2023-12-13T10:00:00.000Z"
      },
      {
        "id": "recYYYYYYY",
        "fields": {
          "Opportunity URL": "https://example.com/opportunity2",
          "Partner": "recPartnerID2",
          "Opportunity Name": "Data Science Summit",
          "Opportunity Status": "Archive",
          "Opportunity Type": "General Events",
          "Opportunity Description": "A summit for aspiring data scientists to network and learn.",
          "Start Date": "2024-03-01",
          "End Date": "2024-03-02",
          "Created At": "2023-10-01T12:00:00.000Z"
        },
        "createdTime": "2023-10-01T12:00:00.000Z"
      }
    ]
  }

const Jobs = () => {

    return (
        <Grid>
            {
                opportunities["records"].map((opportunity) => (
                    <OpportunityContainer key={opportunity.id} {...opportunity.fields}/>
                ))
            }
        </Grid>
)
}

export default Jobs;