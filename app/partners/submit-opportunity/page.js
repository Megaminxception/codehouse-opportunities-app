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

const fields = [
  // this would be replaced with actual data from airtable
  {
    label: "Partner*",
    text: (
      <Text textStyle="sm">
        Not seeing your organization?{" "}
        <Text as="span" color="#900B09" cursor="pointer">
          Register here.
        </Text>
      </Text>
    ),
    type: "select",
    name: "Partner",
    items: ["ABC company", "123 company", "Other"],
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

export default function SubmitOpportunity() {
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
                <Text mb="3" fontSize="md" color="fg.muted">
                  {field.text}
                </Text>
              ) : null}
              {field.type === "select" ? (
                <NativeSelectRoot>
                  <NativeSelectField name={field.name} items={field.items} />
                </NativeSelectRoot>
              ) : field.type === "textarea" ? (
                <Textarea name={field.name} placeholder={field.placeholder} />
              ) : field.type === "input" ? (
                // <Field name="">
                <Input name={field.name} placeholder={field.placeholder} />
              ) : // </Field>
              null}
            </Field>
          ))}

          <Stack direction="row">
            <Field label="Start Date">
              <Text textStyle="sm">First day to apply or register</Text>
              <Input type="date" />
            </Field>
            <Field label="End Date">
              <Text textStyle="sm">Last day to apply or register</Text>
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
