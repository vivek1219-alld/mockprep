import {
  GraduationCap,
  Home,
  BookOpen,
  BarChart2,
  Bookmark,
  Settings,
  Atom,
  HeartPulse,
  LineChart,
  Landmark,
  FileText,
  Book,
  Check,
  Clock,
  Save,
  Download,
  Share2,
  Eye,
  Flag,
  ChevronLeft,
  ChevronRight,
  Plus,
  FlaskRound,
  SquareRadical,
  Dna,
  User,
  ArrowRight,
  X,
  HelpCircle,
  Zap,
  MessageCircle,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  Activity,
  Briefcase,
  Users
} from "lucide-react";

export const Icons = {
  logo: GraduationCap,
  home: Home,
  tests: BookOpen,
  analytics: BarChart2,
  bookmarks: Bookmark,
  settings: Settings,
  atom: Atom,
  heartbeat: HeartPulse,
  chartLine: LineChart,
  landmark: Landmark,
  fileText: FileText,
  book: Book,
  check: Check,
  clock: Clock,
  save: Save,
  download: Download,
  share: Share2,
  eye: Eye,
  flag: Flag,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  plus: Plus,
  flask: FlaskRound,
  squareRoot: SquareRadical,
  dna: Dna,
  user: User,
  arrowRight: ArrowRight,
  x: X,
  helpCircle: HelpCircle,
  zap: Zap,
  messageCircle: MessageCircle,
  star: Star,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  send: Send,
  activity: Activity,
  briefcase: Briefcase,
  users: Users,
  'book-open': BookOpen,
  'bar-chart-2': BarChart2,
  'file-text': FileText
};

// Helper function to get the icon component for a given name
export const getIconByName = (name: string) => {
  const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    "atom": Icons.atom,
    "heartbeat": Icons.heartbeat,
    "chart-line": Icons.chartLine,
    "landmark": Icons.landmark,
    "flask": Icons.flask,
    "square-root-alt": Icons.squareRoot,
    "dna": Icons.dna,
    "activity": Icons.activity,
    "briefcase": Icons.briefcase,
    "graduation-cap": Icons.logo,
    "book-open": Icons["book-open"],
    "file-text": Icons["file-text"],
    "bar-chart-2": Icons["bar-chart-2"],
    "users": Icons.users
  };

  return iconMap[name] || Icons.helpCircle;
};

// Function to use in components that need direct icon access
export const getIcon = (iconName: string) => {
  // First check if it exists directly in Icons
  if (Icons[iconName as keyof typeof Icons]) {
    return Icons[iconName as keyof typeof Icons];
  }
  
  // Then check with the mapping function
  return getIconByName(iconName);
};
