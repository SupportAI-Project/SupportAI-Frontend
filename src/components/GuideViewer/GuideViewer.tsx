import React, { useState, useEffect } from "react";
import { Guide } from "@/types";
import { Sidebar } from "@/components";
import { useRouter } from "next/router";
import axios from "axios";

const GuideViewer: React.FC = () => {
  const router = useRouter();
  const { id: guideId } = router.query; // Destructure guideId from router.query
  const [guide, setGuide] = useState<Guide | null>(null);

  const handleEdit = () => {
    if (guide) {
      try {
        localStorage.setItem(
          "generatedGuide",
          JSON.stringify(guide.contentHTML)
        ); // Store the guide content
        localStorage.setItem(
          "generatedGuideTitle",
          JSON.stringify(guide.contentHTML)
        );
        router.push({
          pathname: "/editor",
          query: {
            id: guideId,
          },
        });
      } catch (error) {
        console.error("Error storing guide in local storage:", error);
      }
    }
  };

  useEffect(() => {
    if (guideId) {
      const fetchGuide = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/guide/${guideId}`,
            { withCredentials: true }
          );
          const guideData = response.data;
          console.log(guideData);

          setGuide(guideData);
        } catch (error) {
          console.error("Error fetching the guide:", error);
        }
      };

      fetchGuide();
    }
  }, [guideId]);

  return (
    <div
      id="wrapper"
      className="d-flex"
      style={{ width: "100%", height: "100vh" }}
    >
      <Sidebar />
      <div className="d-flex flex-column p-2 guideContainer w-100">
        <div className="d-flex align-items-center justify-content-between title w-100">
          <div className="guide-details p-1">
            {guide && (
              <>
                <h1>{guide.title}</h1>
                <h5>Created by {guide.creator}</h5>
                <h6>{guide.creationDate}</h6>
              </>
            )}
          </div>
          {guide && (
            <button className="btn btn-primary btn-user" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
        <hr />
        {guide && (
          <div
            dangerouslySetInnerHTML={{ __html: guide.contentHTML }}
            className="p-4 guide-content"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          />
        )}
      </div>
    </div>
  );
};

export default GuideViewer;
