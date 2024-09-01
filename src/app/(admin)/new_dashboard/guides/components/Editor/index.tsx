import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Box, Button, TextField, Autocomplete, Chip } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CreateGuideRequest } from "@/api/types/Guide";

const DynamicReactQuill = dynamic(() => import("react-quill"));

interface Props {
  initialTitle?: string;
  initialContent?: string;
  categories: string[];
  selectedCategories: string[];
  handleCategoryChange: (event: any, newValue: string[]) => void;
  onSave: () => void;
  register: UseFormRegister<CreateGuideRequest>;
  error: Error | null;
  setValue: UseFormSetValue<CreateGuideRequest>;
  watch: UseFormWatch<CreateGuideRequest>;
}

const GuideEditor = ({
  initialContent = "",
  initialTitle = "",
  categories,
  selectedCategories,
  handleCategoryChange,
  onSave,
  register,
  error,
  setValue,
  watch,
}: Props) => {
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
        {...register("title")}
        label="Title"
        variant="outlined"
        fullWidth
        defaultValue={initialTitle}
        onChange={(e) => setValue("title", e.target.value)}
        sx={{ mb: 2 }}
      />

      <Autocomplete
        multiple
        freeSolo
        options={categories}
        value={selectedCategories}
        onChange={handleCategoryChange}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Box key={index}>
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            </Box>
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Categories"
            placeholder="Add up to 3 categories"
          />
        )}
        sx={{ mt: 2, mb: 2 }}
      />

      <DynamicReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        style={{ height: "350px" }}
        defaultValue={initialContent} // Initial content for the editor
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
