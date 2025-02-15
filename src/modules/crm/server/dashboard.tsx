import CrmDashboardClient from "../client/page";

export default async function CrmDashboard() {
  // ✅ Server-side data fetching
  // const data = await fetch("https://api.example.com/crm-data").then((res) =>
  //   res.json()
  // );

  const data = { customers: { length: 10 } };

  return <CrmDashboardClient data={data} />;
}