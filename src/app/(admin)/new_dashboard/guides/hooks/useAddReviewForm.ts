import { useState } from "react";
import { CreateReviewDto, CreateReviewSchema } from "../dto/CreateReviewDto";
import { useAddReview } from "@/hooks";

const useAddReviewForm = (guideId: number) => {
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [stars, setStars] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { mutate, isError, error, isPending, isSuccess } = useAddReview();

  const handleSubmit = () => {
    const newReview: CreateReviewDto = {
      guideId,
      rating: stars ?? 0,
      title: title.trim(),
      comment: comment.trim() || "",
    };
    const validation = CreateReviewSchema.safeParse(newReview);
    if (!validation.success) {
      setValidationError(
        validation.error.errors.map((err) => err.message).join(", ")
      );
      return;
    }

    mutate(validation.data, {
      onSuccess: () => {
        setComment("");
        setTitle("");
        setStars(0);
      },
    });
  };

  return {
    comment,
    setComment,
    title,
    setTitle,
    stars,
    setStars,
    validationError,
    setValidationError,
    isError,
    error,
    isPending,
    isSuccess,
    handleSubmit,
  };
};

export default useAddReviewForm;
