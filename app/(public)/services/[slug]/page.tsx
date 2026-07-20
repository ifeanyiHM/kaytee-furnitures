import { redirect } from "next/navigation";

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  redirect("/services");
}
