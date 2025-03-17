import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";
import { Users, Brain, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Live Interviews",
    description:
      "Find the perfect match and interview live directly through our platform.",
  },
  {
    icon: Brain,
    title: "Skills Testing",
    description:
      "Take the guesswork out of training and hiring. Choose from 500 standard job-based and subject-based tests.",
  },
  {
    icon: ShieldCheck,
    title: "Background Checks",
    description: "Reduce your time to hire by 80% and get results in minutes.",
  },
];

export default function Features() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
              <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
              <p className="text-slate-600 mb-8">{feature.description}</p>
            </div>
            <div className="flex justify-end">
              <Button className="w-fit">
                Learn More
                <ArrowRight className="w-4 stroke-white h-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
