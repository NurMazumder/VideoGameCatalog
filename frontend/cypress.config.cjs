const { defineConfig } = require("cypress");

module.exports = defineConfig({
  components: {
    devServer: {
      framework: "react",
      bundled: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
