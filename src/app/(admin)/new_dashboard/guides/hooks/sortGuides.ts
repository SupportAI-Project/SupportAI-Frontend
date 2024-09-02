import { Guide } from "@/api/types/Guide";
import { calculateAvgRating } from "@/util/calculateAvgRating";

export const sortByCriteria = (guides: Guide[], sortCriteria: string): Guide[] => {
    return guides.sort((guide1, guide2) => {
        if (sortCriteria === "rating") {
            const avgRatingA = calculateAvgRating(guide1);
            const avgRatingB = calculateAvgRating(guide2);
            return avgRatingB - avgRatingA;
        } else if (sortCriteria === "date") {
            return new Date(guide2.createdAt).getTime() - new Date(guide1.createdAt).getTime();
        }
        return 0;
    });
};