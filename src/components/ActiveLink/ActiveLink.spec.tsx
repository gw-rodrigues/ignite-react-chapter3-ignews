/**
 *  @testing-library/react
 * - renderizar * componente forma virtual, para podermos ver como irá se comportar/output
 */
/**
 *
 * Sempre que formos usarmos libs externas, como useRouter(), etc, que esta no componente original,
 * que nao fazer parte do Jest, além Jest nao fazer parte da nossa app.
 * vamos usar/fazer um "mock" - uma imitação para quando o componente Jest executar, retorna um valor, imposto. (Libs fictícia)
 */

import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return { asPath: "/" };
    },
  };
});

/**
 * Quando temos diversos testes podemos dividir categorizar usando o describe(nome-grupo)
 */
describe("ActiveLink component", () => {
  /**
   * para fazer um teste podemos usar (de maneira mais semântica):
   * - test() - teste/testar
   * - it() - isto/isso
   */
  test("active link if it renders correctly", () => {
    /**
     * render - importado @testing-library/react
     * - render devolve algumas funções:
     *  -- debug
     */

    /**
     * importamos o componente ser testado: ex: <ActiveLink>
     */
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    /**
     * executamos a função devolvida debug
     */
    // debug();

    /**
     * O que eu espero que aconteça - expect()
     *  - complementa várias params, funções
     *  -- getByText() - !!! Nome do const que recebe o render()*
     *  -- toBeInTheDocument()
     */
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("adds active class if its currently active link", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );
    /**
     * usamos a função - toHaveClass() verificar existe tipo/nome class css
     */
    expect(getByText("Home")).toHaveClass("active");
  });
});
