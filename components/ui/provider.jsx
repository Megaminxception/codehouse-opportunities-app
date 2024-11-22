"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import { themeSystem } from "@/styles/theme";

export function Provider(props) {
  return (
    <ChakraProvider value={themeSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
