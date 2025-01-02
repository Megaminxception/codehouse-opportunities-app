"use client";
import { useState, useEffect } from "react";
import {
  Fieldset,
  Stack,
  Center,
  Textarea,
  Input,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import Airtable from "airtable";
import apiKey from "@/Airtable.configure";
// const partnerItems = [];
// const OppTypeItems = [];
const airtable = new Airtable({ apiKey });

const base = airtable.base("app1V5WXWoHT2QGTu");

export default function SubmitOpportunity() {
  const [partnerItems, setPartnerItems] = useState([]);
  useEffect(() => {
    const fetchPartners = () => {
      base("Opportunities")
        .select()
        .eachPage((records, fetchNextPage) => {
          records.forEach((record) => {
            if (record.fields["Opportunity Name"]) {
              setPartnerItems(() =>
                partnerItems.push(record.fields["Opportunity Name"])
              );
            }
          });
          fetchNextPage();
        });
    };

    fetchPartners();
  }, []);
  const fields = [
    {
      label: "Partner*",
      text: (
        <Box textStyle="sm">
          Not seeing your organization?{" "}
          <span style={{ color: "#900B09", cursor: "pointer" }}>
            Register here.
          </span>
        </Box>
      ),
      type: "select",
      name: "Partner",
      items: partnerItems,
    },
    {
      label: "Opportunity Type*",
      type: "select",
      name: "Opportunity Type",
      items: ["Event", "123 company", "Other"],
    },
    {
      label: "Time and Date of Event",
      type: "input",
      name: "Time and Date of Event*",
      placeholder: "12/1/24",
    },
    {
      label: "Title of Opportunity*",
      type: "input",
      name: "Title of Opportunity",
      placeholder: "abc.co/jobs",
    },
    {
      label: "Opportunity URL*",
      type: "input",
      name: "Opportunity URL",
      placeholder: "abc.co",
    },
    {
      label: "Opportunity Description*",
      type: "textarea",
      name: "Opportunity Description",
      placeholder: "We're Hiring!",
    },
  ];

  return (
    <Fieldset.Root pt="120px" pb="274px">
      <Stack textAlign="center" align="center">
        <Heading size="5xl">Submit Opportunities</Heading>
        <Box w="1/3" textAlign="center">
          <Heading>
            Highlight opportunities you want to share with our student network.
          </Heading>
        </Box>
      </Stack>

      <Center>
        <Fieldset.Content w="1/2" align="center" px="4rem">
          {fields.map((field, index) => (
            <Field label={field.label} key={index}>
              {field.text ? (
                <Box mb="3" fontSize="md" color="fg.muted">
                  {field.text}
                </Box>
              ) : null}
              {field.type === "select" ? (
                <NativeSelectRoot>
                  <NativeSelectField name={field.name} items={field.items} />
                </NativeSelectRoot>
              ) : field.type === "textarea" ? (
                <Textarea name={field.name} placeholder={field.placeholder} />
              ) : field.type === "input" ? (
                <Input name={field.name} placeholder={field.placeholder} />
              ) : null}
            </Field>
          ))}

          <Stack direction="row">
            <Field label="Start Date">
              <Text textStyle="sm" color="fg.muted">
                First day to apply or register
              </Text>
              <Input type="date" />
            </Field>
            <Field label="End Date">
              <Text textStyle="sm" color="fg.muted">
                Last day to apply or register*
              </Text>
              <Input type="date" />
            </Field>
          </Stack>

          <Checkbox>I verify the responses above are correct.*</Checkbox>
          <Button bg="primaryBlack" color="primaryWhite">
            Submit
          </Button>
        </Fieldset.Content>
      </Center>
    </Fieldset.Root>
  );
}
