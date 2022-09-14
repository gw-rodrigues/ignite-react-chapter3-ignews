/**
 * testIgnorePatterns - Pastas ser ignoradas
 * setupFilesAfterEnv - Local/ficheiro com os testes
 * transform - arquivos extensões indicadas será converter para jest compreender
 * testEnvironment - Comportamento/ambiente para criação representação da DOM para os teste.
 * moduleNameMapper - lib/dependência que faz com que Jest compreenda arquivos CSS modules
 */

module.exports = {
    testPathIgnorePatterns:["/node_modules/","/.next/","/.slicemachine/","/customtypes/"],
    setupFilesAfterEnv:["<rootDir>/src/tests/setupTests.ts"],
    transform:{
    "^.+\\.(.js|jsx|ts|tsx)$":"<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: "jsdom",
    moduleNameMapper:{
        "\\.{scss|css|sass}":"identity-obj-proxy"
    }
} 