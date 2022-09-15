import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { stripe } from "../../services/stripe";

jest.mock("next-auth/react", () => {
  return {
    useSession: () => ({
      data: null,
      status: "unauthenticated",
    }),
  };
});
jest.mock("next/router");
jest.mock("../../services/stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "$9.90" }} />);
    expect(screen.getByText("for $9.90 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const stripePricesRetrieveMocked = jest.mocked(stripe.prices.retrieve);
    /**
     * !!! SEMPRE função for uma promise, usamos:
     * - .mockResolvedValueOnce({})
     *
     * !!! importante saber como vamos usar dados/params específicos, devemos usar então:
     *  - ({} as any) - para ignorar os dados/params restantes
     */
    stripePricesRetrieveMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 990,
    } as any);

    /**
     * Importamos da Home o "getStaticProps
     * - Como e uma Promise precisamos usar async/await
     * - definimos "async" no it.() e o "await" no getStaticProps()
     */
    const response = await getStaticProps({});

    /**
     * Outra forma de validar um objeto tenha tails informações
     * - .toEqual -> objeto deve ser totalmente igual
     * - expect.objectContaining -> ser igual ou conter alguns dos dados/params indicados
     */
    expect(response).toEqual(
      expect.objectContaining({
        props: { product: { priceId: "fake-price-id", amount: "$9.90" } },
      })
    );
  });
});
