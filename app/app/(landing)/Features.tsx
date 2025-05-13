import { Chrome, Code, Sliders, User } from "lucide-react";
import React from "react";

const Features = () => {
  const features = [
    {
      icon: <Chrome className="w-6 h-6" />,
      title: "Browser Extension",
      description:
        "Tip directly through our Chrome extension while viewing your favorite creator's content.",
      category: "Users",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Developer API",
      description:
        "Integrate tipping functionality into your own platform with our RESTful API.",
      category: "Developers",
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Instant Tipping",
      description:
        "Send tips quickly using just a creator's username across platforms.",
      category: "Everyone",
    },
    {
      icon: <Sliders className="w-6 h-6" />,
      title: "Campaign Management",
      description:
        "Creators can launch and manage custom tipping campaigns with analytics.",
      category: "Creators",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4">
            Seamless Social Tipping
          </h2>
          <p className="text-primary max-w-2xl mx-auto md:text-lg">
            Empower your social interactions with our multi-platform tipping
            solution. Designed for creators, developers, and supporters alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary/5 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 text-amber-50">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-amber-50 mb-2">
                {feature.title}
              </h3>
              <p className="text-primary mb-4">{feature.description}</p>
              <span className="inline-block px-3 py-1 text-sm font-medium text-amber-900 bg-amber-50 rounded-full">
                {feature.category}
              </span>
              <div className="mt-4 pt-4 border-t border-amber-50">
                <div className="h-1 w-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
