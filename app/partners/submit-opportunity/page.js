import { Fieldset, Stack, Center, Textarea, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { text } from "express";

const fields = [
  // this would be replaced with actual data from airtable
  {
    label: "Partner*",
    text: "Not seeing your organization? Register here.",
    type: "select",
    name: "Partner",
    items: ["ABC company", "123 company", "Other"],
  },
  {
    label: "Opportunity Type*",
    type: "select",
    name: "Opportunity Type",
    items: ["ABC company", "123 company", "Other"],
  },
  {
    label: "Time and Date of Event",
    type: "select",
    name: "Time and Date of Event*",
    items: ["ABC company", "123 company", "Other"],
  },
  {
    label: "Title of Opportunity*",
    type: "select",
    name: "Title of Opportunity",
    items: ["ABC company", "123 company", "Other"],
  },
  {
    label: "Opportunity URL*",
    type: "select",
    name: "Opportunity URL",
    items: ["ABC company", "123 company", "Other"],
  },
  {
    label: "Opportunity Description*",
    type: "textarea",
    name: "Opportunity Description",
    placeholder: "We're Hiring!",
  },
];

export default function SubmitOpportunity() {
  {
    /*
        Todo: 12/14
        - fix outline form bug
        - fix font color gray
        */
  }
  return (
    <Fieldset.Root pt="120px" pb="274px" align="center">
      <Stack>
        <Fieldset.Legend>
          <h1 className="text-3xl font-bold">Submit Opportunities</h1>
        </Fieldset.Legend>
        <h2 className="font-extrabold">
          Highlight opportunities you want to share with our student network.
        </h2>
      </Stack>

      <Center>
        <Fieldset.Content w="1/2" align="center" px="4rem">
          {fields.map((field, index) => (
            <Field label={field.label} key={index}>
              {field.text ? <p className="font-light">{field.text}</p> : null}
              {field.type === "select" ? (
                <NativeSelectRoot variant="outline">
                  <NativeSelectField
                    name={field.name}
                    items={field.items}
                    variant="outline"
                    // color="primaryGray"
                  />
                </NativeSelectRoot>
              ) : field.type === "textarea" ? (
                <Textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  variant="outline"
                />
              ) : null}
            </Field>
          ))}

          <Stack direction="row">
            <Field label="Start Date">
              <Input name="Start Date" placeholder="12/1/24" />
            </Field>
            <Field label="End Date">
              <Input name="End Date" placeholder="12/31/24" />
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
