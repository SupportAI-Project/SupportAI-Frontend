import dynamic from "next/dynamic";
import {
  BaseSyntheticEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import "react-quill/dist/quill.snow.css";
import { Box, Button, TextField, Autocomplete, Chip } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CreateGuideRequest } from "@/api/types/Guide";
import { LoadingButton } from "@mui/lab";

const DynamicReactQuill = dynamic(() => import("react-quill"));

interface Props {
  initialTitle?: string;
  initialContent?: string;
  categories?: string[];
  allCategories?: string[];
  onSave: (e?: BaseSyntheticEvent) => void;
  register: UseFormRegister<CreateGuideRequest>;
  error: Error | null;
  setValue: UseFormSetValue<CreateGuideRequest>;
  watch: UseFormWatch<CreateGuideRequest>;
}

const GuideEditor = ({
  initialContent = "",
  initialTitle = "",
  categories,
  onSave,
  allCategories = ["Internet", "Router", "Wi-Fi", "Network"],
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
    <Box component="form" onSubmit={onSave} noValidate>
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
        options={allCategories}
        defaultValue={categories}
        {...register("categories")}
        value={watch("categories") || categories}
        onChange={(event, newValue) => {
          setValue("categories", newValue);
        }}
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
        style={{ height: "550px" }}
        defaultValue={initialContent} // Initial content for the editor
        onChange={(content) => setValue("contentHTML", content)}
      />
      <input type="hidden" {...register("contentHTML")} />

      <Box display="flex" flexDirection="column" alignItems="flex-end" mt={6}>
        <LoadingButton
          variant="contained"
          color="primary"
          startIcon={<SaveAsIcon />}
          type="submit"
        >
          Save Guide
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default GuideEditor;
