"use client";

import { Flex, Grid, createListCollection, GridItem } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { AIRTABLE, AIRTABLE_API_KEY, useEffectAsync } from "@/app/utils";
import { useState } from "react";

const createGraduationYearList = async () => {
  const res = async (direction, def) => {
    const FIELD = "Graduation Year";
    const result = await AIRTABLE.table("Students")
      .select({
        fields: [FIELD],
        sort: [{ direction, field: FIELD }],
        maxRecords: 1,
      })
      .firstPage();
    return result[0]?.fields?.[FIELD] ?? def;
  };

  // TODO: there may be a way to get the min/max with a Table::select()
  const min = +(await res("asc", 2025));
  const max = +(await res("desc", 2028));
  const items = [];
  for (let i = min; i <= max; i++) {
    items.push(i.toString());
  }
  return createListCollection({ items });
};

function Filter({ title, options, placeholder, multiple }) {
  return (
    <SelectRoot
      size="sm"
      width="230px"
      collection={options}
      multiple={multiple}
      closeOnSelect={!multiple}
      disabled={!options.items.length}
      fontFamily="var(--font-mulish)"
    >
      <SelectLabel>{title}</SelectLabel>
      <SelectTrigger clearable={true} className="border-1 rounded-lg">
        <SelectValueText placeholder={placeholder} className="px-2" />
      </SelectTrigger>
      <SelectContent>
        {options.items.map((name) => (
          <SelectItem item={name} key={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

function Filters() {
  const [filterData, setFilterData] = useState({});
  const filters = [
    { id: "fldt4rL3gdIROwiLz", name: "School" },
    { name: "Graduation Year" },
    { id: "fldFNV5dsHlQMnbN6", name: "Majors" },
    { id: "fldOgy7iyYEoWcc6X", name: "Career Paths" },
    { id: "fldoGL9NSqRGsewcW", name: "Skills" },
    { name: "Codehouse Scholar" },
  ];
  const emptyList = createListCollection({ items: [] });

  useEffectAsync(async () => {
    try {
      // We can't use AIRTABLE.makeRequest() here, as it will always send a request to
      // /v0/{id}/{path}, despite this api route which does not start with the ID
      const resp = await fetch(
        `https://api.airtable.com/v0/meta/bases/${AIRTABLE.getId()}/tables`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      ).then((r) => r.json());
      const students = resp.tables.find((table) => table?.id === "tblZuTMwzYU52he5m");
      const result = {};
      for (const { id, name } of filters) {
        if (!id) {
          continue;
        }

        const fieldData = students.fields.find((field) => field?.id === id);
        if (
          !fieldData ||
          (fieldData.type !== "multipleSelects" && fieldData.type !== "singleSelect")
        ) {
          /* bad */
          throw new Error(`Missing field '${name}'`);
        }

        result[name] = {
          multi: fieldData.type === "multipleSelects",
          items: createListCollection({
            items: fieldData.options.choices.map((choice) => choice.name),
          }),
        };
      }

      result["Graduation Year"] = { items: await createGraduationYearList(), multi: false };
      result["Codehouse Scholar"] = {
        items: createListCollection({ items: ["Yes", "No"] }),
        multi: false,
      };
      setFilterData(result);
    } catch (err) {
      /* TODO: display error */
      console.error(err);
    }
  }, []);

  return (
    <>
      {filters.map(({ name }) => (
        <Filter
          key={name}
          title={name}
          options={filterData[name]?.items ?? emptyList}
          multiple={filterData[name]?.multi}
          placeholder={filterData[name] ? "All" : "Loading..."}
        />
      ))}
    </>
  );
}

export default function () {
  return (
    <Flex justify="flex-start" align="center" direction="column" pt={24}>
      <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(3, 1fr)" gap="6">
        <GridItem colSpan="3">{/* Search box here */}</GridItem>
        <Filters />
      </Grid>
    </Flex>
  );
}
