import AddCampaign from "./AddCampaign";
import CampaignCard from "./CampaignCard";

const Campaign = () => {
  const data = [
    {
      id: 1,
      title: "Build Coffee Art Studio",
      description:
        "Help me create a mobile coffee art workshop for the community",
      target_amount: 10000,
      current_amount: 200,
      start_date: "2023-10-01",
      end_date: "2023-12-01",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AddCampaign />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default Campaign;
