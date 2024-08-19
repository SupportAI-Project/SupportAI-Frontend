"use client";
import PageContainer from "@/components/PageContainer";
import { Guide } from "../types";
import { useParams } from "next/navigation";
import { useGuideItems } from "../hooks";
import DashboardCard from "../../shared/Card";
import { useGetGuide } from "./hooks/useGetGuide";

const GuidePage = () => {
  const { id } = useParams<{ id: string }>()!;
  const { guide } = useGetGuide(id);

  if (!guide) {
    return <p>Guide not found</p>;
  }

  return (
    <PageContainer title={guide?.title}>
      <DashboardCard title={guide?.title}>
        <div>
          <h1>{guide?.title}</h1>
          <p>{guide?.issue}</p>
          <p>Likes: {guide?.likes}</p>
          <p>Dislikes: {guide?.dislikes}</p>
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default GuidePage;
