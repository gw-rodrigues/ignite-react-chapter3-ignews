import { render } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return { asPath: "/" };
    },
  };
});

describe("Header component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Home")).toHaveClass("active");
    expect(getByText("Posts")).toHaveClass("active");
  });
});