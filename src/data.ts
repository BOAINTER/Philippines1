import { Asset, SignalItem, PricingPlan, FeatureItem, ChatMessage, FAQItem } from './types';

// Helper to generate candlestick data using a random walk
export function generateMockHistory(basePrice: number, pointsCount = 30): { time: string; open: number; high: number; low: number; close: number; volume: number }[] {
  const data = [];
  let current = basePrice;
  const now = new Date();

  for (let i = pointsCount; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000); // 1 minute intervals
    const change = current * (Math.random() * 0.004 - 0.002);
    const open = current;
    const close = current + change;
    const high = Math.max(open, close) + (Math.random() * (current * 0.001));
    const low = Math.min(open, close) - (Math.random() * (current * 0.001));
    const volume = Math.floor(Math.random() * 5000) + 1000;

    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume
    });

    current = close;
  }
  return data;
}

// Left Assets
export const initialAssets: Asset[] = [
  {
    id: 'f1',
    name: 'Formula One Group (OTC)',
    symbol: 'F1-OTC',
    category: 'Stock',
    currentPrice: 83.81,
    changePercent: 35.39,
    isCall: true,
    accuracy: 91,
    priceHistory: generateMockHistory(83.81, 40)
  },
  {
    id: 'aapl',
    name: 'Apple Inc. (OTC)',
    symbol: 'AAPL-OTC',
    category: 'Stock',
    currentPrice: 302.23,
    changePercent: 1.62,
    isCall: true,
    accuracy: 89,
    priceHistory: generateMockHistory(302.23, 40)
  },
  {
    id: 'gold',
    name: 'Gold Spot (OTC)',
    symbol: 'XAU-USD',
    category: 'Commodity',
    currentPrice: 4536.86,
    changePercent: -0.79,
    isCall: false,
    accuracy: 86,
    priceHistory: generateMockHistory(4536.86, 40)
  },
  {
    id: 'oil',
    name: 'Crude Oil WTI',
    symbol: 'USOIL',
    category: 'Commodity',
    currentPrice: 91.55,
    changePercent: 0.83,
    isCall: true,
    accuracy: 88,
    priceHistory: generateMockHistory(91.55, 40)
  }
];

// Forex signals (Lower Middle Column)
export const forexSignals: SignalItem[] = [
  { id: 'fx1', symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.08699, isCall: true, changePercent: 0.12, time: '1m ago', strength: 92 },
  { id: 'fx2', symbol: 'GBP/JPY', name: 'Pound / Japanese Yen', price: 191.245, isCall: false, changePercent: -0.24, time: '2m ago', strength: 84 },
  { id: 'fx3', symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 156.535, isCall: true, changePercent: 0.08, time: '3m ago', strength: 89 },
  { id: 'fx4', symbol: 'AUD/USD', name: 'Australian / US Dollar', price: 0.66271, isCall: false, changePercent: -0.15, time: '5m ago', strength: 78 },
  { id: 'fx5', symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.36552, isCall: true, changePercent: 0.31, time: '6m ago', strength: 91 },
  { id: 'fx6', symbol: 'NZD/USD', name: 'New Zealand / US Dollar', price: 0.61283, isCall: false, changePercent: -0.07, time: '8m ago', strength: 81 },
  { id: 'fx7', symbol: 'GBP/USD', name: 'Pound / US Dollar', price: 1.27254, isCall: true, changePercent: 0.18, time: '9m ago', strength: 87 },
  { id: 'fx8', symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.89532, isCall: false, changePercent: -0.05, time: '10m ago', strength: 79 },
  { id: 'fx9', symbol: 'EUR/JPY', name: 'Euro / Japanese Yen', price: 168.452, isCall: true, changePercent: 0.22, time: '11m ago', strength: 85 },
  { id: 'fx10', symbol: 'EUR/GBP', name: 'Euro / British Pound', price: 0.85214, isCall: false, changePercent: -0.11, time: '12m ago', strength: 80 },
  { id: 'fx11', symbol: 'AUD/JPY', name: 'Australian Dollar / Yen', price: 103.845, isCall: true, changePercent: 0.35, time: '13m ago', strength: 88 },
  { id: 'fx12', symbol: 'EUR/CAD', name: 'Euro / Canadian Dollar', price: 1.48522, isCall: false, changePercent: -0.19, time: '14m ago', strength: 83 }
];

// Ticker signals (Upper Right Column)
export const topSignals: SignalItem[] = [
  { id: 'ts1', symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.08699, isCall: true, changePercent: 0.12, time: '1m ago', strength: 92 },
  { id: 'ts2', symbol: 'GBP/JPY', name: 'Pound / Japanese Yen', price: 191.245, isCall: false, changePercent: -0.24, time: '2m ago', strength: 84 },
  { id: 'ts3', symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 156.535, isCall: true, changePercent: 0.08, time: '3m ago', strength: 89 },
  { id: 'ts4', symbol: 'AUD/USD', name: 'Australian / US Dollar', price: 0.66271, isCall: false, changePercent: -0.15, time: '5m ago', strength: 78 },
  { id: 'ts5', symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.36552, isCall: true, changePercent: 0.31, time: '6m ago', strength: 91 },
  { id: 'ts6', symbol: 'NZD/USD', name: 'New Zealand / US Dollar', price: 0.61283, isCall: false, changePercent: -0.07, time: '8m ago', strength: 81 },
  { id: 'ts7', symbol: 'GBP/USD', name: 'Pound / US Dollar', price: 1.27254, isCall: true, changePercent: 0.18, time: '9m ago', strength: 87 },
  { id: 'ts8', symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.89532, isCall: false, changePercent: -0.05, time: '10m ago', strength: 79 },
  { id: 'ts9', symbol: 'EUR/JPY', name: 'Euro / Japanese Yen', price: 168.452, isCall: true, changePercent: 0.22, time: '11m ago', strength: 85 },
  { id: 'ts10', symbol: 'EUR/GBP', name: 'Euro / British Pound', price: 0.85214, isCall: false, changePercent: -0.11, time: '12m ago', strength: 80 },
  { id: 'ts11', symbol: 'AUD/JPY', name: 'Australian Dollar / Yen', price: 103.845, isCall: true, changePercent: 0.35, time: '13m ago', strength: 88 },
  { id: 'ts12', symbol: 'EUR/CAD', name: 'Euro / Canadian Dollar', price: 1.48522, isCall: false, changePercent: -0.19, time: '14m ago', strength: 83 }
];

// Features Grid (8 elements)
export const featuresList: FeatureItem[] = [
  {
    id: 'f_ai',
    title: 'AI-Powered Signals',
    description: 'Advanced machine learning algorithms process 200+ micro-indicators every millisecond to identify maximum-probability entry points.',
    iconName: 'Cpu'
  },
  {
    id: 'f_rate',
    title: '87% Verified Win Rate',
    description: 'Fully audited historical accuracy with open logs transparently tracked via blockchain hash. Play and execute with peace of mind.',
    iconName: 'CheckCircle2'
  },
  {
    id: 'f_telegram',
    title: 'Instant Telegram Delivery',
    description: 'Ultra-low latency webhook pipeline pushes active signal entries to the private VIP channel within 120 milliseconds.',
    iconName: 'Send'
  },
  {
    id: 'f_edu',
    title: 'Expert Academy Education',
    description: 'Step-by-step masterclasses, visual technical analysis books, and professional risk management guidelines included.',
    iconName: 'BookOpen'
  },
  {
    id: 'f_bots',
    title: 'Automated Trading Bots',
    description: 'Connect our cloud-hosted auto-trade script directly to your IQ Option, PocketOption or Quotex brokers via premium API keys.',
    iconName: 'Bot'
  },
  {
    id: 'f_consult',
    title: 'One-on-One Consulting',
    description: 'Personal analysis clinics with veteran traders to optimize your psychology, win rates, and compound sheet planning.',
    iconName: 'Users'
  },
  {
    id: 'f_risk',
    title: 'Dynamic Risk Management',
    description: 'Smart position sizing alerts, martingale limit warnings, and trailing stop rules to perfectly shield your capital.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'f_market',
    title: '24/7 Global Asset Market',
    description: 'Sustained continuous scanning across standard forex sessions and OTC weekend indices so you never miss a payout opportunity.',
    iconName: 'Globe'
  }
];

// Pricing Plans
export const pricingPlans: PricingPlan[] = [
  {
    id: 'plan_free',
    name: 'PRO',
    price: 0,
    period: 'one-time payment',
    features: [
      'Live signal checklist',
      'OTC + OTC signals',
      'Automated trading bots',
      'Expert education',
      'Priority Telegram'
    ],
    color: 'border-gold-500'
  },
  {
    id: 'plan_pro1',
    name: 'PRO',
    price: 29,
    period: 'one-time payment',
    features: [
      'Live signal checklist',
      'OTC + OTC signals',
      'Automated trading bots',
      'Expert education',
      'Priority Telegram'
    ],
    color: 'border-gold-500'
  },
  {
    id: 'plan_pro2',
    name: 'PRO',
    price: 29,
    period: 'one-time payment',
    features: [
      'Live signal checklist',
      'OTC + OTC signals',
      'Automated trading bots',
      'Expert education',
      'Priority Telegram'
    ],
    color: 'border-gold-500'
  },
  {
    id: 'plan_pro3',
    name: 'PRO',
    price: 29,
    period: 'one-time payment',
    features: [
      'Live signal checklist',
      'OTC + OTC signals',
      'Automated trading bots',
      'Expert education',
      'Priority Telegram'
    ],
    color: 'border-gold-500'
  }
];

// Supportive Community Chats (Telegram messages in Tagalog/Taglish tailored for Philippine market)
export const initialChatMessages: ChatMessage[] = [
  {
    id: 'c1',
    username: 'Bayani_Bulacan',
    avatarSeed: 'bayani',
    message: 'Grabe ang galing ng signal kanina! Pasok agad ang EUR/USD OTC Call, panalo na naman! Maraming salamat Master Bo! 🇵🇭🔥',
    time: '19:34',
    profit: '+$184.00 (₱10,304)'
  },
  {
    id: 'c2',
    username: 'Tala_Pampanga',
    avatarSeed: 'tala',
    message: 'Ang ganda ng Apple OTC signal ngayon! 4 wins in a row, grabe ang accuracy! Salamat sa BOA team! 👍',
    time: '19:35',
    profit: '+$312.50 (₱17,500)'
  },
  {
    id: 'c3',
    username: 'Mateo_Cavite',
    avatarSeed: 'mateo',
    message: 'Napakabilis pumasok ng GCash payout ko, wala pang 5 minutes! BOA VIP channel is legit and napakalaking tulong! 🇵🇭',
    time: '19:36',
    profit: '+$240.00 (₱13,440)'
  },
  {
    id: 'c4',
    username: 'Danica_Batangas',
    avatarSeed: 'danica',
    message: 'Sobrang linaw ng Gold Spot entry! Ang ganda ng risk management guide, protektado talaga ang puhunan ko.',
    time: '19:37',
    profit: '+$520.00 (₱29,120)'
  },
  {
    id: 'c5',
    username: 'Kuya_Rodel_QC',
    avatarSeed: 'rodel',
    message: 'Kumita ako ng ₱8,400 ngayong gabi lang gamit ang automated bot! Solid 24/7 scanning.',
    time: '19:38',
    profit: '+$150.00 (₱8,400)'
  },
  {
    id: 'c6',
    username: 'Maricar_Pasig',
    avatarSeed: 'maricar',
    message: 'Kahit baguhan lang ako sa trading, sobrang dali sundan ng direct Telegram alerts ni Master Bo! Maraming salamat po! 🙏',
    time: '19:39',
    profit: '+$95.00 (₱5,320)'
  }
];

// FAQs list
export const faqList: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How are BOA signals calculated?',
    answer: 'Our BOA (Binary Options Academy) engine utilizes combined calculations of RSI, MACD, Bollinger Bands, and customized volumetric breakout models paired with real-time AI price tracking to evaluate high-probability win rate indices.'
  },
  {
    id: 'faq2',
    question: 'Is there a guaranteed winrate?',
    answer: 'We maintain an audited winrate of 87% over statistical intervals. While no financial instrument offers 100% guarantees, our dynamic capital protection guides ensure you sustain strong net compound curves.'
  },
  {
    id: 'faq3',
    question: 'Can I trade on my smartphone?',
    answer: 'Absolutely! All signals push directly to your mobile Telegram application. You can view, tap, and copy setups onto any mobile trading app (Quotex, Pocket Option, IQ Option) in real-time.'
  },
  {
    id: 'faq4',
    question: 'How do I start with automated bots?',
    answer: 'Once you unlock the Premium plan, you will receive your credentials to connect our cloud bots. They run 24/7 scanning active signals and execute trades according to your custom risk preferences.'
  }
];
