import { getIconByName } from "@/components/icons";
import { formatDistanceToNow } from "date-fns";
import { Link } from "wouter";

interface ActivityItemProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  date: Date;
  description: string;
  testId?: number;
}

const ActivityItem = ({
  icon,
  iconBg,
  iconColor,
  title,
  date,
  description,
  testId,
}: ActivityItemProps) => {
  const IconComponent = getIconByName(icon) || (() => null);
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });

  const content = (
    <div className="flex items-start space-x-3 pb-4 border-b border-slate-100">
      <div
        className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}
      >
        <IconComponent className={`${iconColor} w-5 h-5`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-slate-800">{title}</h3>
          <span className="text-xs text-slate-500">{formattedDate}</span>
        </div>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  );

  if (testId) {
    return (
      <Link href={`/test/${testId}/result`}>
        <div className="cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
          {content}
        </div>
      </Link>
    );
  }

  return content;
};

export default ActivityItem;
