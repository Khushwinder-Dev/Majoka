import React from "react";
import CommonHeader from "../../Common/CommonHeader";
import EachNews from "../EachNews";
import Stats from "../../Stats";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mock data - replace with API call later
  const mockArticle = {
    id: parseInt(id),
    title: "Leading Innovations in Civil Engineering.",
    category: "Civil Engineering",
    lastUpdate: "Mar 12,2023",
    image: "/news/news.jpg",
    content: `The aim of using placeholder text in civil engineering is to provide a visually appealing block of text (like a sentence, paragraph, or page) that doesn't detract from the overall design. While some debate its effectiveness, employing nonsensical filler text can be quite beneficial when the emphasis is on the layout rather than the written content. This type of text, often referred to as 'dummy text,' is commonly used in drafting plans for construction, architecture, or infrastructure projects. Its origins trace back to an anonymous typesetter in the 15th century, who is believed to have jumbled sections of Cicero's work for inclusion in a type specimen book. It typically starts with...

The aim of using placeholder text in civil engineering is to provide a visually appealing block of text (like a sentence, paragraph, or page) that doesn't detract from the overall design. While some debate its effectiveness, employing nonsensical filler text can be quite beneficial when the emphasis is on the layout rather than the written content. This type of text, often referred to as 'dummy text,' is commonly used in drafting plans for construction, architecture, or infrastructure projects. Its origins trace back to an anonymous typesetter in the 15th century, who is believed to have jumbled sections of Cicero's work for inclusion in a type specimen book. It typically starts with...

The aim of using placeholder text in civil engineering is to provide a visually appealing block of text (like a sentence, paragraph, or page) that doesn't detract from the overall design. While some debate its effectiveness, employing nonsensical filler text can be quite beneficial when the emphasis is on the layout rather than the written content. This type of text, often referred to as 'dummy text,' is commonly used in drafting plans for construction, architecture, or infrastructure projects. Its origins trace back to an anonymous typesetter in the 15th century, who is believed to have jumbled sections of Cicero's work for inclusion in a type specimen book. It typically starts with...`,
  };

  return (
    <div>
      <CommonHeader
        title="News Details"
        breadcrumb={`News / ${mockArticle.title}`}
        imagePath="/project.jpg"
      />
      <EachNews article={mockArticle} />
      <Stats />
    </div>
  );
}
