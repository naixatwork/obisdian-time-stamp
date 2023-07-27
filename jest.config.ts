export default {
    preset: 'ts-jest',
    coverageProvider: "v8",
    moduleDirectories: ["node_modules", "src"],
    "collectCoverageFrom": [
        "!main.ts"
    ],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    setupFilesAfterEnv: ["./setup-tests.ts"],
};
