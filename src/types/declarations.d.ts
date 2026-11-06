declare module "lucide-react" {
  import * as React from "react";
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  export type LucideIcon = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >;
  export const Phone: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Award: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const Flame: LucideIcon;
  export const Clock: LucideIcon;
  export const UserCheck: LucideIcon;
  export const Send: LucideIcon;
  export const Lock: LucideIcon;
  export const MapPin: LucideIcon;
  export const Mail: LucideIcon;
  export const FileText: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const Loader2: LucideIcon;
  export const Building2: LucideIcon;
  export const Factory: LucideIcon;
  export const Home: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const PhoneCall: LucideIcon;
  export const Tag: LucideIcon;
  export const Calendar: LucideIcon;
  export const Info: LucideIcon;
  export const Eye: LucideIcon;
  export const Zap: LucideIcon;
  export const Star: LucideIcon;
  export const Quote: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Truck: LucideIcon;
  export const Leaf: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const Wrench: LucideIcon;
  export const Settings: LucideIcon;
  export const Images: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const Inbox: LucideIcon;
  export const Package: LucideIcon;
  export const Search: LucideIcon;
  export const LogOut: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const User: LucideIcon;
  export const Plus: LucideIcon;
  export const Trash2: LucideIcon;
  export const Edit2: LucideIcon;
  export const Save: LucideIcon;
  export const Filter: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const Globe: LucideIcon;
  const icons: { [key: string]: LucideIcon };
  export default icons;
}

