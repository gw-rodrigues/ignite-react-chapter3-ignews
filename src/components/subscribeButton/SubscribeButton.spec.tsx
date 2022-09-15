import { render, screen, fireEvent } from "@testing-library/react";
import { SubscribeButton } from ".";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirect user to sign in when it is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    const singInMocked = jest.mocked(signIn);
    singInMocked.mockReturnValueOnce({
      signIn: jest.fn(),
    } as never);

    render(<SubscribeButton />);

    /**
     * Vamos disparar evento, para verificar se user foi redirecionado - import "fireEvent" evento button
     * - evento de click
     */

    const subscribeButton = screen.getByText("Subscribe now");
    fireEvent.click(subscribeButton);

    /**
     * Depois, nesse caso, verificamos se uma função "signIn" - "signInMocked" foi chamada !!!
     */
    expect(singInMocked).toHaveBeenCalled();
  });

  it("redirects to posts when user is already has a subscription", () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        activeSubscription: "fake-active-subscription",
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    /**
     * temos que declarar a função "push"
     * !!!! importante seguir o passo exatamente !!!
     *
     *  - .mockImplementationOnce(() => ({ push: "fnMocked" } as any));
     *
     * !!! se da ERROR !!!
     */
    const pushMock = jest.fn();
    useRouterMocked.mockImplementationOnce(() => ({ push: pushMock } as any));

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");
    fireEvent.click(subscribeButton);

    /**
     * verificamos se a função "push -pushMocked" foi chamada do useRouter
     * podemos usar:
     * - .toHaveBeenCalled()
     * - .toHaveBeenCalledWith("rota")
     */
    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
