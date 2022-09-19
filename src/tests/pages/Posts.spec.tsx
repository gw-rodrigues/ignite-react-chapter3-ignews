import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => {
  return { useSession: () => ({ data: null, status: "unauthenticated" }) };
});

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "fake-slug",
    title: "fake-title",
    excerpt: "fake-excerpt",
    updatedAt: "2022-09-16",
  },
];

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValue({
      getAllByType: jest.fn().mockResolvedValueOnce(posts),
    } as any);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
    expect(screen.getByText("fake-excerpt")).toBeInTheDocument();
    expect(screen.getByText("2022-09-16")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: "fake-slug",
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
        },
      ]),
    } as any);

    const response = await getStaticProps({ previewData: undefined });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "fake-slug",
              title: "fake-title",
              excerpt: "fake-excerpt",
              updatedAt: "16 de setembro de 2022",
            },
          ],
        },
      })
    );
  });
});
