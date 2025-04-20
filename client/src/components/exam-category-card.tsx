import { getIconByName } from "@/components/icons";
import { Link } from "wouter";

interface ExamCategoryCardProps {
  id: number;
  name: string;
  description: string;
  icon: string;
  testCount: number;
  colorClass?: string;
}

const ExamCategoryCard = ({
  id,
  name,
  description,
  icon,
  testCount,
  colorClass = "blue",
}: ExamCategoryCardProps) => {
  // Map color classes
  const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
    blue: {
      bg: "bg-blue-100",
      text: "text-primary",
      hover: "hover:bg-blue-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      hover: "hover:bg-green-200",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      hover: "hover:bg-amber-200",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      hover: "hover:bg-indigo-200",
    },
  };

  const color = colorMap[colorClass] || colorMap.blue;
  const IconComponent = getIconByName(icon);

  return (
    <Link href={`/exam/${name.toLowerCase().replace(/ /g, "-")}`}>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition cursor-pointer block">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-12 h-12 rounded-lg ${color.bg} flex items-center justify-center`}>
            <IconComponent className={`text-xl ${color.text} w-6 h-6`} />
          </div>
          <span className={`text-xs font-medium px-2 py-1 ${color.bg} ${color.text} rounded-full`}>
            {testCount} Tests
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-slate-500 mb-3">{description}</p>
        <div className={`flex items-center ${color.text} font-medium text-sm`}>
          <span>Explore</span>
          <svg
            className="ml-2 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ExamCategoryCard;
