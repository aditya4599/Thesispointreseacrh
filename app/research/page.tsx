import { ResearchHubClient } from "@/components/ResearchHubClient";
import { getAllResearchItems } from "@/lib/data";

export const metadata = {
  title: "Research Library",
};

export default function ResearchPage() {
  const items = getAllResearchItems();
  return <ResearchHubClient items={items} />;
}
