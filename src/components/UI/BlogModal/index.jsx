import { useEffect, useState } from "react";
import DevBrosModal from "../Modal";
import { useFirebase } from "../../../context/FirebaseProvider";
import Input from "../Inputs/Input";

const BlogModal = ({ open, onClose, blog, onUpdate }) => {
  const [MarkdownEditor, setMarkdownEditor] = useState(null);
  const [content, setContent] = useState(blog?.content || "");
  const [title, setTitle] = useState(blog?.title || "");
  const [slug, setSlug] = useState(blog?.slug || "");
  const { updateBlogPosts, user } = useFirebase();

  useEffect(() => {
    const importMarkdownEditor = async () => {
      // Use dynamic import to import the MarkdownEditor component
      const module = await import("@uiw/react-markdown-editor");
      setMarkdownEditor(module.default);
    };

    // Call the dynamic import function
    importMarkdownEditor();
  }, []);

  useEffect(() => {
    setContent(blog?.content || "");
    setTitle(blog?.title || "");
    setSlug(blog?.slug || "");
  }, [blog]);

  const handleSaveBlog = async () => {
    const author_uid = blog?.author?.author_uid || user?.key;
    const createdDate = blog?.createdDate || Date.now();
    const updateDate = Date.now();
    await updateBlogPosts({
      ...blog,
      content,
      title,
      updateDate,
      createdDate,
      author_uid,
      author: user,
      slug,
    }).then(() => {
      onClose();
      onUpdate();
    });
  };

  return (
    <DevBrosModal open={open} onClose={onClose}>
      <div className="flex w-full max-w-4xl flex-col gap-6 rounded bg-slate-700 px-3 py-7">
        <p className="text-2xl font-semibold">{!!blog ? "Edit" : "New"} Blog</p>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        {MarkdownEditor && (
          <MarkdownEditor
            value={content}
            height="350px"
            onChange={(value, viewUpdate) => {
              setContent(value);
            }}
          />
        )}
        <div className="mt-2 flex w-full justify-end">
          <button className="btn-success btn" onClick={() => handleSaveBlog()}>
            Save Blog
          </button>
        </div>
      </div>
    </DevBrosModal>
  );
};

export default BlogModal;
