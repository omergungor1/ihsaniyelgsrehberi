import { getSiteSetting } from "@/lib/admin/queries";
import ContactForm from "@/components/admin/ContactForm";

export default async function AdminContactPage() {
  const contact = await getSiteSetting("contact");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#042352]">İletişim</h1>
        <p className="mt-1 text-[14px] text-[#727F94]">
          Site genelinde kullanılan iletişim bilgilerini düzenleyin.
        </p>
      </div>

      <ContactForm contact={contact} />
    </div>
  );
}
