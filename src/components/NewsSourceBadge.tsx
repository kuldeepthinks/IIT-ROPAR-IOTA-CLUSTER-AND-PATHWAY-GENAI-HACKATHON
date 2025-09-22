import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";

interface NewsSourceBadgeProps {
  sources: string[];
  timestamp: Date;
}

export const NewsSourceBadge = ({ sources, timestamp }: NewsSourceBadgeProps) => {
  const timeAgo = () => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>{timeAgo()}</span>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {sources.slice(0, 3).map((source, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="text-xs h-5 px-2 cursor-pointer hover:bg-accent"
          >
            <ExternalLink className="h-2 w-2 mr-1" />
            {source}
          </Badge>
        ))}
        {sources.length > 3 && (
          <Badge variant="outline" className="text-xs h-5 px-2">
            +{sources.length - 3} more
          </Badge>
        )}
      </div>
    </div>
  );
};