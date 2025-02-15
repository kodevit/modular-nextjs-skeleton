"use client";

interface CrmData {
  customers: { length: number };
}

export default function CrmDashboardClient({ data }: { data: CrmData }) {
  return (
    <div>
      <h1>CRM Dashboard</h1>
      <p>Customer Count: {data.customers.length}</p>
    </div>
  );
}
