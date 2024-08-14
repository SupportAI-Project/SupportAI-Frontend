import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import styles from "./Editor.module.css";
import "./input.css";
import axios, { isAxiosError } from "axios";

// Dynamically import ReactQuill with no server-side rendering
const DynamicReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Editor: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [title, setTitle] = useState<string>("");
  const [contentHTML, setContent] = useState<string>("");

  useEffect(() => {
    const fetchGuide = async () => {
      const guide = localStorage.getItem("generatedGuide");

      if (guide) {
        setContent(guide);
        localStorage.removeItem("generatedGuide");
      } else {
        try {
          console.log(router.query);

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/guide/${queryId}`,
            { withCredentials: true }
          );
          const fetchedGuide = response.data;
          setTitle(fetchedGuide.title);
          setContent(fetchedGuide.contentHTML);
          localStorage.setItem("generatedGuide", fetchedGuide.contentHTML);
        } catch (error) {
          console.error("Error fetching guide:", error);
          toast.error("Failed to load guide. Please try again later.");
        }
      }
    };

    fetchGuide();
  }, []);

  const handleProcedureContentChange = (content: string) => {
    setContent(content);
    localStorage.setItem("generatedGuide", content);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const publishGuide = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/guide`,
        {
          creatorId: 123, // Hardcoded creatorId, replace as needed
          title,
          contentHTML,
        },
        { withCredentials: true }
      );
      console.log(response);

      localStorage.removeItem("generatedGuide"); // Clear local storage after successful publish
      router.push("/guides");
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to publish guide");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: [] }],
      [{ background: [] }],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
  ];

  return (
    <div className={styles.container}>
      <div className="d-flex flex-row justify-content-between p-1 header">
        <input
          placeholder="Untitled"
          type="text"
          className="input mb-2"
          value={title}
          onChange={handleTitleChange}
        />

        <div className={styles.footer}>
          <button className={styles.button} onClick={publishGuide}>
            Publish
          </button>
        </div>
      </div>
      <DynamicReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={contentHTML}
        onChange={handleProcedureContentChange}
        className={styles.editor}
      />

      <ToastContainer />
    </div>
  );
};

export default Editor;
