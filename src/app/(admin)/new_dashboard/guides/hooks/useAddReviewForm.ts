import { useState } from "react";
import { CreateReviewDto, CreateReviewSchema } from "../dto/CreateReviewDto";
import { useAddReview } from "@/hooks";

const useAddReviewForm = (guideId: number) => {
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { mutate, isError, error, isPending, isSuccess } = useAddReview();

  const handleSubmit = () => {
    const newReview: CreateReviewDto = {
      guideId,
      rating: stars ?? 1,
      comment: comment.trim() || '',
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
        setComment('');
        setStars(1);
      },
    });
  };

  return {
    comment,
    setComment,
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
