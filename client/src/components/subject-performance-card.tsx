import { getIconByName } from "@/components/icons";
import { Progress } from "@/components/ui/progress";

interface SubjectPerformanceCardProps {
  name: string;
  icon: string;
  accuracy: number;
  completion: number;
}

const SubjectPerformanceCard = ({
  name,
  icon,
  accuracy,
  completion,
}: SubjectPerformanceCardProps) => {
  const IconComponent = getIconByName(icon);
  
  // Map icon to background color
  const iconBgMap: Record<string, string> = {
    "atom": "bg-blue-100",
    "flask": "bg-green-100",
    "square-root-alt": "bg-purple-100",
    "dna": "bg-amber-100",
    "heartbeat": "bg-red-100",
    "chart-line": "bg-emerald-100",
    "landmark": "bg-violet-100"
  };
  
  const iconBg = iconBgMap[icon] || "bg-blue-100";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition">
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center mr-3`}>
          <IconComponent className="text-primary w-5 h-5" />
        </div>
        <h3 className="font-semibold">{name}</h3>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-slate-500">Accuracy</span>
          <span className="text-sm font-medium">{accuracy}%</span>
        </div>
        <Progress 
          value={accuracy} 
          className="h-2 w-full bg-slate-200" 
          indicator="bg-primary" 
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-slate-500">Completion</span>
          <span className="text-sm font-medium">{completion}%</span>
        </div>
        <Progress 
          value={completion} 
          className="h-2 w-full bg-slate-200" 
          indicator="bg-green-500" 
        />
      </div>
    </div>
  );
};

export default SubjectPerformanceCard;
