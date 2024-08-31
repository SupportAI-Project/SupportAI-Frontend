import { Guide } from "@/api/types/Guide";

export const sortByCriteria = (guides: Guide[], sortCriteria: string): Guide[] => {
    return guides.sort((a, b) => {
        if (sortCriteria === "rating") {
            const avgRatingA = a.reviews?.reduce((acc, review) => acc + review.rating, 0) ?? 1;
            const avgRatingB = b.reviews?.reduce((acc, review) => acc + review.rating, 0) ?? 1;
            return avgRatingB - avgRatingA;
        } else if (sortCriteria === "date") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
    });
};