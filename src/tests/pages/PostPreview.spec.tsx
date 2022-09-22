import { render, screen } from "@testing-library/react";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../../services/prismic");

const post = {
  slug: "fake-slug",
  title: "fake-title",
  content: "<p>fake-excerpt</p>",
  updatedAt: "2022-09-16",
};

describe("PostPreview page", () => {
  /** */
  it("renders correctly", () => {
    render(<Post post={post} />);

    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: [],
      status: "unauthenticated",
    } as never);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
    expect(screen.getByText("fake-excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  /** */
  it("redirect user to full post when user is subscribed", async () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: "fake-active-subscription",
      status: "authenticated",
    } as never);

    const useRouterMocked = jest.mocked(useRouter);
    const pushMocked = jest.fn();
    useRouterMocked.mockReturnValueOnce({ push: pushMocked } as any);

    render(<Post post={post} />);
    expect(pushMocked).toHaveBeenCalledWith("/posts/fake-slug");
  });

  // /** */
  it("loads initial data", async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: "heading1",
              text: "fake-title",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "fake-excerpt",
            },
          ],
        },
        last_publication_date: "2022-09-16",
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: "fake-slug",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "fake-slug",
            title: "fake-title",
            content: "<p>fake-excerpt</p>",
            updatedAt: "16 de setembro de 2022",
          },
        },
      })
    );
  });
});
