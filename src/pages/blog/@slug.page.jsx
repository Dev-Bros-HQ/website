import { usePageContext } from "../../context/usePageContext";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useFirebase } from "../../context/FirebaseProvider";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";

const Page = () => {
  const pageContext = usePageContext();
  const blogSlug = pageContext.routeParams.slug;
  const { getBlogPost } = useFirebase();
  const [blog, setBlog] = useState();

  const fetchBlog = async (slug) => {
    if (slug.length) {
      await getBlogPost(slug, setBlog);
    }
  };

  useEffect(() => {
    fetchBlog(blogSlug);
  }, [blogSlug]);

  return (
    <>
      <section className="mx-auto flex w-full max-w-2xl flex-col px-4 py-16 text-left">
        {!!blog ? (
          <>
            <div className="mb-5">
              <h1 className="text-5xl">{blog.title}</h1>
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={blog.author.photoUrl}
                  className="h-10 w-10 rounded-full"
                />
                <p>{blog.author.displayName}</p>
              </div>
            </div>
            <Markdown
              src={blog.content}
              remarkPlugins={[[remarkGfm]]}
              components={{
                h1: (props) => <h2 className="mb-5 text-5xl" {...props} />,
                p: (props) => <p className="mb-5 text-base" {...props} />,
              }}
            >
              {blog.content}
            </Markdown>
          </>
        ) : (
          <Spinner />
        )}
      </section>
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "Dev Bros Blog",
  "og:description": "The Dev Bros Blog",
};
