import StatusCard from "./StatusCard";
import Welcome from "./Welcome";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#1A120B] text-[#E5DCC3] px-4 py-12 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">
        <StatusCard />
        <Welcome />
      </div>
    </main>
  );
}
