module.exports = {
  "setupTestFrameworkScriptFile": "<rootDir>/tools/test-setup.js",

  "setupFiles": ["jest-localstorage-mock"],

  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],

  "collectCoverage": true,

  "coverageDirectory": "jest_coverage"
};