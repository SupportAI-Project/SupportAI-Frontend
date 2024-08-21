import { useState } from 'react';
import { useAddReview } from './guideClientHooks';
import { CreateReviewDto, CreateReviewSchema } from '../dto/CreateReviewDto';

const useAddReviewForm = (guideId: number) => {
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { mutate, isError, error, isPending, isSuccess } = useAddReview();

  const handleSubmit = () => {
    const newReview: CreateReviewDto = {
      guideId,
      stars: stars ?? 0,
      comment: comment.trim() || undefined,
    };
    const validation = CreateReviewSchema.safeParse(newReview);
    if (!validation.success) {
      setValidationError(
        validation.error.errors.map((err) => err.message).join(', ')
      );
      return;
    }

    mutate(validation.data, {
      onSuccess: () => {
        setComment('');
        setStars(0);
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
