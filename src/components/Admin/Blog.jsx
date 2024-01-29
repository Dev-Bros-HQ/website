import { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseProvider";
import { EditPencil, Trash } from "iconoir-react";
import BlogModal from "../UI/BlogModal";
import DevBrosModal from "../UI/Modal";
import Spinner from "../Spinner";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [activeBlog, setActiveBlog] = useState(null);
  const { getBlogPosts, deleteBlogPost, user } = useFirebase();

  useEffect(() => {
    if (user.key && !blogs.length) {
      const fetchBlogPosts = async () => {
        await getBlogPosts(setBlogs, user?.key);
      };

      fetchBlogPosts();
    }
  }, [refresh, user]);

  const handleBlogEdit = (blog) => {
    setActiveBlog(blog);
    setShowModal(true);
  };

  const handleDeleteBlog = (blog) => {
    setActiveBlog(blog);
    setShowDelete(true);
  };

  const handleBlogDeleted = () => {
    setShowDelete(false);
    setActiveBlog(null);
    setRefresh(refresh + 1);
  };

  return (
    <div>
      <div className="flex w-full justify-between">
        <h1 className="text-4xl">Blog Posts</h1>
        <button className="btn-success btn" onClick={() => handleBlogEdit()}>
          Add Blog
        </button>
      </div>
      <br />
      <div className="flex flex-col gap-2">
        {!!blogs.length ? (
          blogs?.map((blog) => {
            return (
              <div
                key={blog.title}
                className="flex items-center justify-between gap-2 rounded bg-slate-700 p-2"
              >
                <div className="flex items-center gap-2">
                  <b>{blog.title}</b> <p>by {blog.author.firstName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="btn-primary btn-sm btn"
                    onClick={() => handleBlogEdit(blog)}
                  >
                    <EditPencil />
                  </button>
                  <button
                    className="btn-error btn-sm btn"
                    onClick={() => handleDeleteBlog(blog)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex w-full justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        )}
      </div>
      <BlogModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setActiveBlog(null);
        }}
        onUpdate={() => setRefresh(refresh + 1)}
        blog={activeBlog}
      />
      <DevBrosModal
        open={showDelete}
        onClose={() => {
          setShowDelete(false);
        }}
      >
        <div className="w-full max-w-lg rounded-2xl bg-slate-600 px-2 py-7 text-error">
          <p className="text-center text-2xl font-semibold">
            Are you sure you want to delete {activeBlog?.title}?
          </p>
          <div className="mt-3 flex justify-center gap-4">
            <button
              onClick={() => handleBlogDeleted()}
              className="btn-outline btn"
            >
              No, I changed my mind
            </button>
            <button
              onClick={() =>
                deleteBlogPost(activeBlog.id, () => handleBlogDeleted())
              }
              className="btn-error btn"
            >
              Yes, delete the blog post
            </button>
          </div>
        </div>
      </DevBrosModal>
    </div>
  );
};

export default Blog;
