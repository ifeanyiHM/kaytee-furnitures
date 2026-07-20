import type { Metadata } from "next";
import { getAddresses } from "@/actions/user";
import { AddressManager } from "@/components/forms/AddressManager";

export const metadata: Metadata = { title: "Addresses" };

export default async function AddressesPage() {
  const addresses = await getAddresses().catch(() => []);
  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal mb-6">
        Delivery addresses
      </h1>
      <AddressManager addresses={addresses} />
    </div>
  );
}
