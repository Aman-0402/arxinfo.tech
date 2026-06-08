import { prisma } from "@/lib/db";
import SiteContactForm from "@/components/admin/SiteContactForm";

export default async function SettingsPage() {
  const info = await prisma.siteContact.findFirst();
  const initial = info
    ? { address: info.address, phone: info.phone, email: info.email, whatsapp: info.whatsapp ?? "", mapEmbed: info.mapEmbed ?? "" }
    : null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-2xl text-gray-800 dark:text-white">Site Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Contact information shown in footer and contact page.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-8">
        <h2 className="font-poppins font-semibold text-lg text-gray-800 dark:text-white mb-6">Contact Information</h2>
        <SiteContactForm initial={initial} />
      </div>
    </div>
  );
}
