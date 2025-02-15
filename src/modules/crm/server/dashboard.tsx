import CrmDashboardClient from "../client/page";

export default async function CrmDashboard() {
  // ✅ Server-side data fetching
  // const data = await fetch("https://api.example.com/crm-data").then((res) =>
  //   res.json()
  // );
  const len = 
  Math.floor(Math.random() * 100)

  const data = { customers: { length: len } };

  return <CrmDashboardClient data={data} />;
}