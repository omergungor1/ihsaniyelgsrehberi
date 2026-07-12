import HomePage from "@/components/HomePage";
import { getHomePageData } from "@/lib/data/queries";

export default async function Page() {
  const data = await getHomePageData();
  return <HomePage data={data} />;
}
