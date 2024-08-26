"use client";

import React from "react";
import { Box, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDeleteGuide } from "../../hooks/guideClientHooks";
import { useParams, useRouter } from "next/navigation";

const DeleteEditButtons: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const id = params?.id ? Number(params.id) : 0;
  const deleteMutation = useDeleteGuide(id);

  const handleDelete = () => {
    deleteMutation.mutate();
    router.push("/new_dashboard/guides");
  };

  const handleEdit = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0,
      }}
    >
      <IconButton aria-label="edit">
        <ModeEditOutlineOutlinedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default DeleteEditButtons;
