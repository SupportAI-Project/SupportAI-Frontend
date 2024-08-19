import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Box, Button, TextField } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";

const DynamicReactQuill = dynamic(() => import("react-quill"));

interface Props {
  initialTitle?: string;
  initialIssue?: string;
  initialContent?: string;
  onSave: (title: string, issue: string, content: string) => void;
}

const GuideEditor = ({
  initialTitle = "",
  initialIssue = "",
  initialContent = "",
  onSave,
}: Props) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [issue, setIssue] = useState<string>(initialIssue);
  const [contentHTML, setContent] = useState<string>(initialContent);

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
    <>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Issue"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />
      <DynamicReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={contentHTML}
        style={{ height: "570px" }}
        onChange={(content) => setContent(content)}
      />
      <Box display="flex" flexDirection="column" alignItems="flex-end" mt={6}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveAsIcon />}
          onClick={() => onSave(title, issue, contentHTML)}
        >
          Save Guide
        </Button>
      </Box>
    </>
  );
};

export default GuideEditor;
