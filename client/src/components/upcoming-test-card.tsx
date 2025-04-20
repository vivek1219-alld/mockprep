import { Icons } from "@/components/icons";
import { getIconByName } from "@/components/icons";
import { Link } from "wouter";

interface UpcomingTestCardProps {
  id: number;
  name: string;
  examType: string;
  examTypeIcon: string;
  duration: number;
  totalQuestions: number;
  daysFromNow: number;
  badgeColorClass?: string;
}

const UpcomingTestCard = ({
  id,
  name,
  examType,
  examTypeIcon,
  duration,
  totalQuestions,
  daysFromNow,
  badgeColorClass = "blue",
}: UpcomingTestCardProps) => {
  // Map color classes for badge
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-100", text: "text-primary" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    amber: { bg: "bg-amber-100", text: "text-amber-600" },
    indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
  };

  const color = colorMap[badgeColorClass] || colorMap.blue;
  
  // Format days from now text
  let daysText = "";
  if (daysFromNow === 0) {
    daysText = "Today";
  } else if (daysFromNow === 1) {
    daysText = "Tomorrow";
  } else {
    daysText = `In ${daysFromNow} days`;
  }

  return (
    <Link href={`/test/${id}/instructions`}>
      <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 cursor-pointer block">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium px-2 py-0.5 ${color.bg} ${color.text} rounded-full`}>
            {examType}
          </span>
          <span className="text-xs text-slate-500">{daysText}</span>
        </div>
        <h3 className="font-medium text-slate-800">{name}</h3>
        <div className="flex items-center text-xs text-slate-500 mt-1">
          <Icons.clock className="mr-1 h-3 w-3" />
          <span>{duration} minutes</span>
          <span className="mx-2">•</span>
          <Icons.helpCircle className="mr-1 h-3 w-3" />
          <span>{totalQuestions} questions</span>
        </div>
      </div>
    </Link>
  );
};

export default UpcomingTestCard;
