import {
  Timeline,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

import { Sparkles, Wallet, SendHorizontal, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: <Wallet className="h-6 w-6 text-primary" />,
    title: "Connect Wallet",
    description:
      "Sign in with your Web3 wallet to start receiving tips securely and instantly.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Create Your Page",
    description:
      "Set up your Tipper profile with your name, bio, and social links in seconds.",
  },
  {
    icon: <SendHorizontal className="h-6 w-6 text-primary" />,
    title: "Share Your Link",
    description:
      "Promote your tip page anywhere — on Twitter, Instagram, or your blog.",
  },
  {
    icon: <ThumbsUp className="h-6 w-6 text-primary" />,
    title: "Receive Tips",
    description:
      "Get tips from fans directly to your wallet with on-chain transparency and no middlemen.",
  },
];

export default function MyTimeline() {
  return (
    <Timeline defaultValue={3}>
      {steps.map((item, index) => (
        <TimelineItem
          key={index}
          step={index + 1}
          className="w-[calc(50%-1.5rem)] odd:ms-auto even:text-right even:group-data-[orientation=vertical]/timeline:ms-0 even:group-data-[orientation=vertical]/timeline:me-8 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:-right-6 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:left-auto even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:translate-x-1/2 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:-right-6 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:left-auto even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:translate-x-1/2"
        >
          <TimelineHeader>
            <TimelineSeparator className="bg-primary" />
            <div className="flex items-center gap-3">
              {item.icon}
              <TimelineTitle className="text-amber-50 text-2xl">
                {item.title}
              </TimelineTitle>
            </div>
            <TimelineIndicator className="bg-primary" />
          </TimelineHeader>
          <p className="mt-2 text-base text-muted-foreground">
            {item.description}
          </p>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
