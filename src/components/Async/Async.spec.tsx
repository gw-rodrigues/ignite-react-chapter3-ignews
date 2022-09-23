import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Async from ".";

/**
 * 1 - Forma (async/await)
 * esse mostra como testar em functions async/await
 * teremos que usar o método findByText
 *
 * no expect com await vai espera a promise ser resolvida para verificar os valores
 *  -> expect(await screen.findByText("Button")).toBeInTheDocument();
 *
 * podemos passar opções
 *
 *  -> expect(await screen.findByText("Button", {},{ timeout:... })).toBeInTheDocument();
 *
 *
 * 2 - Forma (waitFor)
 * ficará a executar a função waitFor até que receba um valor no expect.
 * podemos então o método getByText
 *
 *  -> await waitFor(() => { return expect(screen.getByText("Button")).toBeInTheDocument(); });
 *
 * podemos passar configurações
 *
 *  -> await waitFor(() => { return expect(screen.getByText("Button")).toBeInTheDocument(); }, { onTimeOut: ... });
 */

describe("Async component", () => {
  //   it("it render correctly with async/await", async () => {
  //     render(<Async />);
  //     expect(screen.getByText("Hello World!")).toBeInTheDocument();
  //     expect(await screen.findByText("Button")).toBeInTheDocument();
  //   });

  it("it render correctly with async/await", async () => {
    render(<Async />);
    expect(screen.getByText("Hello World!")).toBeInTheDocument();

    // await waitFor(() => {
    //   return expect(screen.queryByText("Button")).toBeInTheDocument();
    // });
    await waitForElementToBeRemoved(screen.queryByText("Button"));
  });
});

/**
 * .get - assíncrono, nao irá esperar pelo elemento aparecer.
 * .query - assíncrono, mais nao vai dar erra caso nao achar
 * .find - vai procurar, nao encontrar vai ficar observando, procurando para ver se o elemento irá aparecer, se nao da um erro.
 *
 * método screen tem varias opções para validar um elemento
 * - getByLabel, byPlaceHolder, getByRole, getByTestId, getByTitle, etc...
 *
 * Quando nao sabemos que propriedade usar para validar este elemento, podemos:
 *
 *  fazemos o render
 *  -> render(<Component />)
 *
 *  adicionamos a seguinte linha
 *  -> screen.logTestingPlaygroundURL()
 *
 *  irá retornar uma URL ao clicarmos mostrará página de playground,
 *  com todo HTML gerado no nossos testes.
 *  Podemos passar o mouse por cima ele irá mostrará uma sugestão qual propriedade usar
 *  -> suggested query:
 *  -> > getByRole('button', { name: /sign in with github/i })
 *
 *  Mas ele mostra mais propriedades disponíveis para validar.
 *
 *  Também regista todos os eventos, teclado e mouse realizados durante essa simulação de testes.
 *
 *
 *
 *  !!! Coverage report - podemos saber quais teste estão sendo feitos e quais estão cobrindo.
 *   -> jest coverage
 *   -> jest configuring
 *
 *      https://jestjs.io/docs/configuration#collectcoverage-boolean
 *
 *  adicionar no jest.config.js
 *
 * podemos adicionar os arquivos e ignorar os arquivos da nossa app.
 */

//  collectCoverage: true,
//  collectCoverageFrom: [
//      'src/**/*.tsx',
//      '!src/**/*.spec.tsx',
//      '!src/**/_app.tsx',
//      '!src/**/_document.tsx',
//  ],
//  coverageReporters:['lcov','json']

/**
 * executamos agora o yarn test com coverage
 * -> yarn test --coverage
 *
 * Criara pasta coverage, open in finder, > icov-report > index.html
 *
 * podemos ver um relatório da nossa aplicação
 * assim podemos saber se estamos a gerar testes suficientes para a nossa aplicação!
 *
 * -> a selecionar o testes, podemos ver as linhas que podiam ser testadas.
 *
 *
 */
