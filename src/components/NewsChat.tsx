import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Newspaper, TrendingUp, Zap, Users, Brain, Rss } from "lucide-react";
import { LiveFeedStatus } from "./LiveFeedStatus";
import { NewsSourceBadge } from "./NewsSourceBadge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  category?: string;
  sources?: string[];
  confidence?: number;
}

const newsCategories = [
  { id: "breaking", label: "Breaking", icon: Zap, color: "bg-breaking text-breaking-foreground" },
  { id: "tech", label: "Technology", icon: Brain, color: "bg-news-tech text-white" },
  { id: "finance", label: "Finance", icon: TrendingUp, color: "bg-news-finance text-white" },
  { id: "politics", label: "Politics", icon: Users, color: "bg-news-politics text-white" },
  { id: "sports", label: "Sports", icon: Newspaper, color: "bg-news-sports text-white" },
];

const mockNewsResponses = {
  tech: [
    {
      content: "🚀 **OpenAI Announces GPT-5 Architecture Breakthrough**\n\nOpenAI just revealed GPT-5's new reasoning capabilities, showing 40% improvement in complex problem-solving tasks. The model introduces 'chain-of-thought reasoning' that mirrors human cognitive processes.\n\n**Key highlights:**\n• 2.5x faster inference speed\n• 90% accuracy on advanced mathematics\n• Real-time code generation and debugging\n• Enhanced multimodal understanding\n\nThis positions OpenAI significantly ahead in the AI race, with potential applications in scientific research, education, and enterprise automation.",
      sources: ["TechCrunch", "Wired", "The Information", "OpenAI Blog"],
      confidence: 0.95
    },
    {
      content: "💡 **Google's Gemini 2.0 Revolutionizes Real-Time Code Generation**\n\nGoogle DeepMind launches Gemini 2.0 with unprecedented real-time code generation capabilities, achieving 95% accuracy in production environments.\n\n**Breaking developments:**\n• Live code debugging and optimization\n• Natural language to code translation\n• Integration with major IDEs\n• Enterprise rollout starting Q1 2024\n\nEarly beta testers report 60% reduction in development time, marking a significant shift in software engineering workflows.",
      sources: ["The Verge", "Ars Technica", "Google AI Blog", "IEEE Spectrum"],
      confidence: 0.92
    }
  ],
  finance: [
    {
      content: "📈 **Tesla Stock Surges 12% Following Record Q4 Earnings**\n\nTesla reports record-breaking Q4 2023 earnings with $29.5B revenue, beating analyst estimates by 18%. The surge is driven by unprecedented EV demand in Asian markets and breakthrough battery technology.\n\n**Financial highlights:**\n• Revenue: $29.5B (+25% YoY)\n• Net income: $7.2B (+45% YoY)\n• Vehicle deliveries: 484,507 units\n• Energy storage deployments: +65%\n\nCEO Musk announces expansion into India and Southeast Asia, targeting 2M annual vehicle capacity by 2025.",
      sources: ["Reuters", "Bloomberg", "Financial Times", "MarketWatch"],
      confidence: 0.97
    },
    {
      content: "💰 **Bitcoin Hits New All-Time High of $87,500**\n\nBitcoin reaches historic levels following major institutional adoption announcements. BlackRock, Fidelity, and JPMorgan collectively announce $15B cryptocurrency investment programs.\n\n**Market dynamics:**\n• 24h trading volume: $89B (+156%)\n• Market cap: $1.72T\n• Institutional inflows: $4.2B this week\n• Options activity at record highs\n\nAnalysts predict potential rally to $100K as traditional finance embraces digital assets.",
      sources: ["CoinDesk", "Financial Times", "Bloomberg", "Coinbase"],
      confidence: 0.89
    }
  ],
  breaking: [
    {
      content: "🚨 **BREAKING: Quantum Computing Breakthrough Achieved**\n\nIBM and Google jointly announce quantum supremacy in drug discovery, successfully modeling complex protein structures 1000x faster than classical computers.\n\n**Immediate implications:**\n• Alzheimer's treatment timeline accelerated by 5-10 years\n• Cancer research gets quantum boost\n• Pharmaceutical industry transformation\n• $2T market opportunity unlocked\n\n**LIVE UPDATE (2 min ago):** FDA announces fast-track approval process for quantum-designed therapeutics.\n\nThis represents the first practical quantum advantage with immediate real-world impact.",
      sources: ["BBC", "CNN", "Nature", "Science", "IBM Research"],
      confidence: 0.98
    },
    {
      content: "⚡ **URGENT: Historic Climate Agreement Reached**\n\nG20 leaders unanimously approve revolutionary $500B climate technology fund at emergency summit. Agreement includes binding commitments for net-zero by 2045.\n\n**Key provisions:**\n• $500B over 10 years for clean tech\n• Mandatory carbon pricing globally\n• Fossil fuel phase-out timeline\n• Technology sharing framework\n\n**DEVELOPING:** China announces $150B renewable energy expansion, India commits to 100% clean electricity by 2040.\n\nThis surpasses Paris Agreement ambitions and creates largest international cooperation in history.",
      sources: ["AP News", "Reuters", "UN Climate", "Guardian"],
      confidence: 0.94
    }
  ],
  politics: [
    {
      content: "🏛️ **AI Regulation Framework Passes Senate with Bipartisan Support**\n\nHistoric 87-13 vote establishes comprehensive AI governance, requiring transparency and accountability for automated systems affecting citizens.\n\n**Legislative details:**\n• Mandatory AI impact assessments\n• Algorithmic bias testing requirements\n• Consumer data protection expansion\n• $10B enforcement budget allocated\n\n**Industry response:** Tech giants support framework, citing competitive clarity. Implementation begins January 2024.\n\nThis positions the US as global leader in responsible AI governance.",
      sources: ["Politico", "The Hill", "Washington Post", "C-SPAN"],
      confidence: 0.91
    }
  ],
  sports: [
    {
      content: "⚽ **FIFA Announces Revolutionary World Cup 2026 Format**\n\nFIFA unveils expanded 48-team format with 16 host cities across North America. Tournament features first-ever sustainability requirements and $2B prize pool.\n\n**Tournament innovations:**\n• 104 matches over 39 days\n• Carbon-neutral stadiums requirement\n• Real-time VAR improvements\n• Global streaming partnership\n\n**JUST IN:** Record 5.2M ticket applications received in first hour of sales, 40x oversubscribed.\n\nExpected to be most-watched sporting event in history with 8B global audience.",
      sources: ["ESPN", "FIFA", "The Athletic", "Sky Sports"],
      confidence: 0.88
    }
  ]
};

export const NewsChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "🌍 **Welcome to Breaking News Intelligence**\n\nI'm your AI-powered news analyst with access to **300+ live data sources** updating every second. I use Dynamic RAG to provide real-time insights on breaking developments.\n\n**Try asking me:**\n• \"What's the latest on AI regulation in Europe?\"\n• \"Summarize today's market-moving tech news\"\n• \"Tell me about breaking climate developments\"\n\nI'm connected to live feeds from Reuters, Bloomberg, BBC, TechCrunch, and more for instant, verified information.",
      sender: "bot",
      timestamp: new Date(),
      sources: ["Pathway LiveAI Engine"],
      confidence: 1.0
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateTyping = (response: any, category?: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: response.content,
        sender: "bot",
        timestamp: new Date(),
        category,
        sources: response.sources,
        confidence: response.confidence
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1800);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response based on input
    const lowerInput = input.toLowerCase();
    let response;
    let category = "general";
    
    if (lowerInput.includes("tech") || lowerInput.includes("ai") || lowerInput.includes("technology") || lowerInput.includes("openai") || lowerInput.includes("google")) {
      response = mockNewsResponses.tech[Math.floor(Math.random() * mockNewsResponses.tech.length)];
      category = "tech";
    } else if (lowerInput.includes("finance") || lowerInput.includes("stock") || lowerInput.includes("market") || lowerInput.includes("bitcoin") || lowerInput.includes("tesla")) {
      response = mockNewsResponses.finance[Math.floor(Math.random() * mockNewsResponses.finance.length)];
      category = "finance";
    } else if (lowerInput.includes("breaking") || lowerInput.includes("urgent") || lowerInput.includes("climate") || lowerInput.includes("quantum")) {
      response = mockNewsResponses.breaking[Math.floor(Math.random() * mockNewsResponses.breaking.length)];
      category = "breaking";
    } else if (lowerInput.includes("politics") || lowerInput.includes("government") || lowerInput.includes("regulation")) {
      response = mockNewsResponses.politics[Math.floor(Math.random() * mockNewsResponses.politics.length)];
      category = "politics";
    } else if (lowerInput.includes("sports") || lowerInput.includes("fifa") || lowerInput.includes("world cup")) {
      response = mockNewsResponses.sports[Math.floor(Math.random() * mockNewsResponses.sports.length)];
      category = "sports";
    } else {
      // Default response combining multiple sources
      response = {
        content: "📊 **Latest Multi-Domain Intelligence Summary**\n\nBased on live analysis from 300+ sources in the past hour:\n\n" + 
        mockNewsResponses.breaking[0].content.split('\n\n')[0] + "\n\n" +
        mockNewsResponses.tech[0].content.split('\n\n')[0] + "\n\n" +
        mockNewsResponses.finance[0].content.split('\n\n')[0] + "\n\n" +
        "*Real-time confidence scores and source attribution available for each story.*",
        sources: ["Multi-source aggregation", "Pathway LiveAI", "Dynamic RAG Pipeline"],
        confidence: 0.93
      };
    }

    simulateTyping(response, category);
    setInput("");
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const responses = mockNewsResponses[categoryId as keyof typeof mockNewsResponses];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    const categoryMessage: Message = {
      id: Date.now().toString(),
      content: `Show me latest ${categoryId} news`,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, categoryMessage]);
    simulateTyping(response, categoryId);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Rss className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Breaking News Intelligence</h1>
            <p className="text-sm text-muted-foreground">Pathway LiveAI™ • Dynamic RAG • Real-time Analysis</p>
          </div>
          <div className="ml-auto">
            <Badge variant="outline" className="animate-pulse-breaking bg-breaking/10 text-breaking border-breaking/20">
              🔴 LIVE
            </Badge>
          </div>
        </div>
      </div>

      {/* Live Feed Status */}
      <div className="px-4 pt-4">
        <LiveFeedStatus />
      </div>

      {/* Categories */}
      <div className="p-4 border-b bg-card/30">
        <div className="flex gap-2 overflow-x-auto">
          {newsCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap transition-all ${
                  category.id === "breaking" 
                    ? "bg-breaking text-breaking-foreground hover:bg-breaking/90 animate-pulse-breaking" 
                    : ""
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
          >
            <Card className={`max-w-[85%] ${
              message.sender === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card border-l-4 border-l-primary/20"
            }`}>
              <CardContent className="p-4">
                <div className="prose prose-sm max-w-none">
                  {message.content.split('\n').map((line, index) => (
                    <p key={index} className={`mb-2 ${message.sender === "user" ? "text-primary-foreground" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
                
                {message.sender === "bot" && (
                  <>
                    {message.confidence && (
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          <Brain className="h-3 w-3 mr-1" />
                          Confidence: {Math.round(message.confidence * 100)}%
                        </Badge>
                        {message.category && (
                          <Badge variant="outline" className="text-xs capitalize">
                            {message.category}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {message.sources && (
                      <NewsSourceBadge sources={message.sources} timestamp={message.timestamp} />
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-slide-up">
            <Card className="bg-card border-l-4 border-l-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Processing live data from 300+ sources...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about breaking news, tech updates, market trends, politics..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim()} className="px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            💡 Powered by Dynamic RAG • ~200ms response time • 300+ live sources
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Pipeline Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};