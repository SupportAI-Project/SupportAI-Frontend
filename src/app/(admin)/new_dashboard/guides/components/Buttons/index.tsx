"use client";
import React from "react";
import { Box, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useParams, useRouter } from "next/navigation";
import { useDeleteGuide } from "../../hooks/useDeleteGuide";

const DeleteEditButtons = () => {
  const router = useRouter();
  const params = useParams();

  const id = params?.id ? Number(params.id) : 0;

  const { handleDelete } = useDeleteGuide(id);

  const handleEdit = () => {
    router.push(`/new_dashboard/guides/edit/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0,
      }}
    >
      <IconButton aria-label="edit" onClick={handleEdit}>
        <ModeEditOutlineOutlinedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default DeleteEditButtons;
