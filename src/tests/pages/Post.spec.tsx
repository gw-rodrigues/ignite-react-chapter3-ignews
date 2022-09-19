import { render, screen } from "@testing-library/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../services/prismic";
import { useSession, getSession } from "next-auth/react";

jest.mock("next-auth/react");

jest.mock("../../services/prismic");

const post = {
  slug: "fake-slug",
  title: "fake-title",
  content: "<p>fake-excerpt</p>",
  updatedAt: "2022-09-16",
};

describe("Posts page", () => {
  /** */
  it("renders correctly", () => {
    render(<Post post={post} />);

    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValue({
      getAllByType: jest.fn().mockResolvedValueOnce(post),
    } as any);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
    expect(screen.getByText("fake-excerpt")).toBeInTheDocument();
  });

  /** */
  it("redirect user if has no subscription", async () => {
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({ activeSubscription: null } as any);

    const response = await getServerSideProps({
      req: {
        cookies: {},
      },
      params: {
        slug: "fake-slug",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
          permanent: false,
        }),
      })
    );
  });

  /** */
  it("loads initial data", async () => {
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

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

    const response = await getServerSideProps({
      req: {
        cookies: {},
      },
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
