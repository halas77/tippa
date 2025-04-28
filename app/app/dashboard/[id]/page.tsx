import Footer from "@/app/(landing)/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusCard from "./(dashboard)/StatusCard";
import Welcome from "./(dashboard)/Welcome";
import Campaign from "./(campaign)/Campaign";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#1A120B] text-[#E5DCC3] px-4 py-12 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">
        <Tabs defaultValue="dashboard">
          <TabsList className="mx-auto w-full max-w-lg justify-center mb-10 bg-secondary/20 ">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>
          <TabsContent className="space-y-6" value="dashboard">
            <StatusCard />
            <Welcome />
          </TabsContent>
          <TabsContent value="campaigns">
            <Campaign />
          </TabsContent>
        </Tabs>
        <Footer />
      </div>
    </main>
  );
}
