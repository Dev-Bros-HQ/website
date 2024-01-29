import { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseProvider";
import { format } from "date-fns";
import Spinner from "../../components/Spinner";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const { getBlogPosts } = useFirebase();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      await getBlogPosts(setBlogs);
    };

    fetchBlogPosts();
  }, []);

  return (
    <>
      <section className="mx-auto flex w-full max-w-2xl flex-col px-4 py-16 text-left">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-3xl font-semibold">Dev Bros Blog</h1>
          {!!blogs.length ? (
            blogs?.map((blog) => {
              const { photoUrl, displayName, firstName, lastName } =
                blog.author;
              return (
                <a
                  key={blog.title}
                  className="btn flex items-center justify-between gap-2 rounded bg-slate-700 normal-case"
                  href={`/blog/${blog.slug}`}
                >
                  <div className="flex items-center gap-2">
                    <b>{blog.title}</b>
                    <span className="text-xs opacity-50">
                      {format(blog.updateDate, "MM/dd/yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {photoUrl ? (
                      <div className="avatar">
                        <div className="h-6 w-6 rounded-full ring-1 ring-primary ring-offset-2 ring-offset-base-100">
                          <img src={photoUrl} alt={displayName} />
                        </div>
                      </div>
                    ) : (
                      <div className="placeholder avatar bg-secondary-focus">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-primary ring-offset-2 ring-offset-base-100">
                          <p className="text-2xl">{`${firstName.charAt(
                            0
                          )}${lastName.charAt(0)}`}</p>
                        </div>
                      </div>
                    )}
                    <p>{displayName}</p>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="flex w-full justify-center">
              <Spinner size="lg" color="primary" />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "Dev Bros Blog",
  "og:description": "The Dev Bros Blog",
};
