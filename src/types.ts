export interface Asset {
  id: string;
  name: string;
  symbol: string;
  category: 'Stock' | 'Forex' | 'Commodity' | 'Crypto';
  currentPrice: number;
  changePercent: number;
  isCall: boolean;
  accuracy: number;
  priceHistory: { time: string; open: number; high: number; low: number; close: number; volume: number }[];
}

export interface SignalItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  isCall: boolean;
  changePercent: number;
  time: string;
  strength: number; // 0 to 100
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
  color: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  username: string;
  avatarSeed: string; // Used for unique visual avatars
  message: string;
  time: string;
  profit?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
