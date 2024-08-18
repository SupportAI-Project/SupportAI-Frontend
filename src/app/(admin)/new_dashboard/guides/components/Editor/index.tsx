import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Box, Button, TextField } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";

const DynamicReactQuill = dynamic(() => import("react-quill"));

interface Props {
  intitialTitle?: string;
  initialIssue?: string;
  initialContent?: string;
  onSave: (content: string) => void;
}

const GuideEditor = ({ initialContent = "", onSave }: Props) => {
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
      <TextField label="Title" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <TextField label="Issue" variant="outlined" fullWidth sx={{ mb: 2 }} />
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
          onClick={() => onSave(contentHTML)}
        >
          Save Guide
        </Button>
      </Box>
    </>
  );
};

export default GuideEditor;
