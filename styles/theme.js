const { defineConfig, createSystem, defaultConfig } = require("@chakra-ui/react");

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primaryWhite: '#ffffff',
        primaryGray: '#E6E6E6',
      },
    },
  },
});

export const themeSystem = createSystem(defaultConfig, config);
