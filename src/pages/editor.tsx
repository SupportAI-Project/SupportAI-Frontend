import React from "react";
import { Editor, Sidebar } from "@/components";
import router, { useRouter } from "next/router";

const editorPage: React.FC = () => {
  const router = useRouter();
  const { name, content } = router.query;

  return (
    <>
      <div
        id="wrapper"
        className="d-flex"
        style={{ width: "100%", height: "100vh" }}
      >
        <Sidebar />
        <Editor guideContent={content as string} />
      </div>
    </>
  );
};

export default editorPage;
