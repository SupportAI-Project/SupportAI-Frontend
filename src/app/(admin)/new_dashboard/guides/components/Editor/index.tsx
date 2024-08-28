import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Box, Button, TextField } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CreateGuideRequest } from "@/api/types/Guide";
import { editorFormats, editorModules } from "@/util/theme";

const DynamicReactQuill = dynamic(() => import("react-quill"));

interface Props {
  initialTitle?: string;
  initialContent?: string;
  onSave: () => void;
  register: UseFormRegister<CreateGuideRequest>;
  error: Error | null;
  setValue: UseFormSetValue<CreateGuideRequest>;
}

const GuideEditor = ({
  initialContent = "",
  initialTitle = "",
  onSave,
  register,
  error,
  setValue,
}: Props) => {
  
  return (
    <>
      <TextField
        {...register("title")}
        label="Title"
        variant="outlined"
        fullWidth
        defaultValue={initialTitle}
        onChange={(e) => setValue("title", e.target.value)}
        sx={{ mb: 2 }}
      />
      <DynamicReactQuill
        theme="snow"
        modules={editorModules}
        formats={editorFormats}
        style={{ height: "570px" }}
        defaultValue={initialContent} 
        onChange={(content) => setValue("contentHTML", content)}
      />
      <input type="hidden" {...register("contentHTML")} />
      <Box display="flex" flexDirection="column" alignItems="flex-end" mt={6}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveAsIcon />}
          onClick={() => onSave()}
        >
          Save Guide
        </Button>
      </Box>
    </>
  );
};

export default GuideEditor;
