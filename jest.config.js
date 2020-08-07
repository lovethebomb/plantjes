module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  globals: {},
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest"
  },
  moduleFileExtensions: ["vue", "js", "json", "node"]
};
