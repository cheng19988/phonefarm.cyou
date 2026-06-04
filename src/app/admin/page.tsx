import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata = { title: "Admin | Cyou Phone Farm" };

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }
  return <AdminDashboard />;
}
