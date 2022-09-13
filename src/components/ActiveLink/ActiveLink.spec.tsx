/**
 *  @testing-library/react
 * - renderizar * componente forma virtual, para podermos ver como irá se comportar/output
 */
import { render } from "@testing-library/react";
import { ActiveLink } from ".";

test("active link renders correctly", () => {
  /**
   * render - importado @testing-library/react
   * - render devolve algumas funções:
   *  -- debug
   */

  /**
   * importamos o componente ser testado: ex: <ActiveLink>
   */
  const { debug } = render(
    <ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
  );

  /**
   * executamos a função devolvida debug
   */
  debug();
});
