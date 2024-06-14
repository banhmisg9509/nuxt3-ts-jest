module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1",
    "^~/(.*)": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(ts)$": "babel-jest",
    ".*\\.(vue)$": "@vue/vue3-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(nuxt3|unenv))"],
};
