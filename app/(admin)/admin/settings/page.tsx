import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings — Admin" };

export default function AdminSettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="font-display text-3xl text-charcoal mb-6">Site settings</h1>
      <div className="space-y-5">
        {[
          { title: "Business information", fields: ["Company name", "Phone number", "Email address", "Physical address"] },
          { title: "Social media", fields: ["Instagram URL", "Facebook URL", "Twitter URL", "Pinterest URL"] },
          { title: "Homepage content", fields: ["Hero headline", "Hero subtext", "CTA button text"] },
        ].map((section) => (
          <div key={section.title} className="bg-white border border-sand-200 rounded-xl p-6">
            <h2 className="font-display text-lg text-charcoal mb-4">{section.title}</h2>
            <div className="space-y-3">
              {section.fields.map((field) => (
                <div key={field} className="space-y-1.5">
                  <label className="block font-sans text-sm font-medium text-charcoal">{field}</label>
                  <input type="text" className="w-full h-10 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder={field} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button className="h-10 px-6 bg-brand-600 text-white rounded font-sans text-sm hover:bg-brand-800 transition-colors">Save settings</button>
        </div>
      </div>
    </div>
  );
}
