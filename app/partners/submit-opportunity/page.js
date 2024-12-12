import { Fieldset, Stack, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

export default function SubmitOpportunity() {
  return (
    <Fieldset.Root
      pos="relative"
      top={20} // make this inherit instead of hard value
      py="2rem"
      w="full"
      align="center"
    >
      <Stack>
        <Fieldset.Legend>
          <h1 className="text-3xl font-bold">Submit Opportunities</h1>
        </Fieldset.Legend>
        <h2 className="font-extrabold">
          Highlight opportunities you want to share with our student network.
        </h2>
      </Stack>

      <Fieldset.Content>
        <Field label="Parter">
          <NativeSelectRoot>
            <NativeSelectField
              name="Partner"
              items={["ABC company", "123 company", "Other"]}
            />
          </NativeSelectRoot>
        </Field>

        <Field label="Opportunity Type*">
          <NativeSelectRoot>
            <NativeSelectField
              name="Opportunity Type"
              items={["ABC company", "123 company", "Other"]}
            />
          </NativeSelectRoot>
        </Field>

        <Field label="Time and Date of Event">
          <NativeSelectRoot>
            <NativeSelectField
              name="Time and Date of Event*"
              items={["ABC company", "123 company", "Other"]}
            />
          </NativeSelectRoot>
        </Field>

        <Field label="Title of Opportunity">
          <NativeSelectRoot>
            <NativeSelectField
              name="Title of Opportunity"
              items={["ABC company", "123 company", "Other"]}
            />
          </NativeSelectRoot>
        </Field>

        <Field label="Title of Opportunity">
          <NativeSelectRoot>
            <NativeSelectField
              name="Title of Opportunity"
              items={["ABC company", "123 company", "Other"]}
            />
          </NativeSelectRoot>
        </Field>

        <Field label="Opportunity URL">
          <NativeSelectRoot>
            <NativeSelectField
              name="Opportunity URL"
              items={["ABC company", "123 company", "Other"]}
            />
          </NativeSelectRoot>
        </Field>

        <Field label="Opportunity Description">
          <Input name="Opportunity Description" placeholder="We're Hiring!" />
        </Field>

        {/*
        Todo 12/13
        - add start/end date inputs
        - verify checkbox
        - submit button
        - fix css for field width to fit in the page
            - maybe use a stack comp.
        - fix nav and footer positions
        */}
      </Fieldset.Content>
    </Fieldset.Root>
  );
}
