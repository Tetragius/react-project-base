module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch": ["**/?(*.)+(test).ts?(x)"],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "snapshotSerializers": ["enzyme-to-json/serializer", "jest-html"],
    "setupTestFrameworkScriptFile": "<rootDir>/setupEnzyme.ts",
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
}