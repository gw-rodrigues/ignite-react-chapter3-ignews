/**
 * testIgnorePatterns - Pastas ser ignoradas
 * setupFilesAfterEnv - Local/ficheiro com os testes
 * transform - arquivos extensões indicadas será converter para jest compreender
 * testEnvironment - Comportamento/ambiente para criação representação da DOM para os teste.
 */

module.exports = {
    testPathIgnorePatterns:["/node_modules/","/.next/","/.slicemachine/","/customtypes/"],
    setupFilesAfterEnv:["<rootDir>/src/tests/setupTests.ts"],
    transform:{
    "^.+\\.(.js|jsx|ts|tsx)$":"<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: "jsdom"
} 