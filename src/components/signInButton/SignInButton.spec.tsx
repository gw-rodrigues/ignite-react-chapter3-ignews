import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";

/**
 * Quando temos que ter params diferentes dentro do mock
 * precisamos importar a lib respectiva
 *
 * !!! Precisamos de uma ferramenta "yarn add ts-jest @types/jest -D" series utilidades e funcionalidades !!! função desatualizada !!!
 *
 * ---> vamos usar: jest.mocked("") - criar replica da funcionalidade
 *
 * Para cada test/it colocamos declaramos e colocamos os valores fictícios desejáveis
 */
import { useSession } from "next-auth/react";
jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    /**
     * Criamos replica do useSession
     *
     * - .mockReturnValue() - todas vez linha for executada vamos chamar a função e retorna valores fictícios do useSession do react
     * - Usar: .mockReturnValueOnce() - apenas proximo retorno de linha ou essa linha,  (render) se nao sera executado para todos os renders.
     */
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    /**
     * Podemos usar o debug para ver o que esta a ser retornado, ex: HTML, etc
     */
    // const { debug } = render(<SignInButton />);
    // debug()
    render(<SignInButton />);
    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        expires: "fake-expires",
      },
      status: "authenticated",
    });
    render(<SignInButton />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
