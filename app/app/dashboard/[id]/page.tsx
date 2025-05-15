"use client";

import Footer from "@/app/(landing)/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusCard from "./(dashboard)/StatusCard";
import Welcome from "./(dashboard)/Welcome";
import Campaign from "./(campaign)/Campaign";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-[#1A120B] text-[#E5DCC3] px-4 py-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">
        <Tabs defaultValue="dashboard">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 md:gap-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
              tippa.
            </h3>
            <div className="flex flex-col sm:flex-row items-center sm:items-end w-full sm:justify-end gap-4">
              <TabsList className="overflow-x-auto whitespace-nowrap bg-secondary/20 rounded-md w-full max-w-xs">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              </TabsList>
              <Button
                onClick={handleLogout}
                size="sm"
                className="cursor-pointer mb-0.5 rounded-sm"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Content */}
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
