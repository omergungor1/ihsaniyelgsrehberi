import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/data/queries";

export default async function PublicLayout({ children }) {
  const settings = await getSiteSettings();
  const contact = settings.contact || {};

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 pt-[76px]">{children}</main>
      <Footer contact={contact} />
    </div>
  );
}
