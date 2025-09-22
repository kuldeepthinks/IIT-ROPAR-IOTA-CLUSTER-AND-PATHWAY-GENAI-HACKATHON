import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rss, Wifi, Database, Zap } from "lucide-react";

interface FeedSource {
  name: string;
  status: "active" | "connecting" | "error";
  lastUpdate: string;
  articlesCount: number;
}

export const LiveFeedStatus = () => {
  const [feeds, setFeeds] = useState<FeedSource[]>([
    { name: "NewsAPI", status: "active", lastUpdate: "2s ago", articlesCount: 1247 },
    { name: "Reuters RSS", status: "active", lastUpdate: "1s ago", articlesCount: 892 },
    { name: "BBC News", status: "connecting", lastUpdate: "5s ago", articlesCount: 634 },
    { name: "Bloomberg", status: "active", lastUpdate: "3s ago", articlesCount: 445 },
    { name: "TechCrunch", status: "active", lastUpdate: "4s ago", articlesCount: 289 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeeds(prevFeeds => 
        prevFeeds.map(feed => ({
          ...feed,
          lastUpdate: Math.random() > 0.7 ? "Just now" : feed.lastUpdate,
          articlesCount: feed.articlesCount + (Math.random() > 0.8 ? 1 : 0),
          status: Math.random() > 0.95 ? "connecting" : "active"
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalArticles = feeds.reduce((sum, feed) => sum + feed.articlesCount, 0);
  const activeSources = feeds.filter(feed => feed.status === "active").length;

  return (
    <Card className="bg-card/50 border-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Wifi className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Live Sources</span>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {activeSources}/5 Active
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Database className="h-3 w-3" />
            <span>{totalArticles.toLocaleString()} Articles Indexed</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {feeds.map((feed, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-background/50">
              <div className={`w-2 h-2 rounded-full ${
                feed.status === "active" 
                  ? "bg-green-500 animate-pulse" 
                  : feed.status === "connecting"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{feed.name}</div>
                <div className="text-xs text-muted-foreground">{feed.lastUpdate}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-3 pt-2 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Rss className="h-3 w-3" />
            <span>Dynamic RAG Pipeline</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>~200ms Response Time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};