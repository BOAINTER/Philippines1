import { useEffect, useState, FormEvent } from 'react';
import { ChatMessage } from '../types';
import { MessageSquare, Send, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommunitySectionProps {
  initialMessages: ChatMessage[];
}

const extraMessages = [
  { username: 'Marco_Manila', message: 'USD/JPY Call hits payout perfectly on PocketOption! Salamat BOA! 🇵🇭💰', profit: '+$92.00 (₱5,152)', avatarSeed: 'marco' },
  { username: 'Angela_Cebu', message: 'Just joined the VIP tier! Direct signals and GCash payouts clear fast.', avatarSeed: 'angela' },
  { username: 'Rich_Trader_PH', message: 'BOA is literally the highest accuracy signal channel I have used.', profit: '+$410.00 (₱22,960)', avatarSeed: 'rich' },
  { username: 'Jun_Davao', message: 'Napakagandang indicator suite! Super clear risk management guidance. 🙏', avatarSeed: 'jun' }
];

export default function CommunitySection({ initialMessages }: CommunitySectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [activeAlerts, setActiveAlerts] = useState(324); // mock users online

  // Simulate incoming messages periodically
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const extra = extraMessages[index % extraMessages.length];
      const now = new Date();
      const newMessage: ChatMessage = {
        id: `c_dyn_${Date.now()}`,
        username: extra.username,
        avatarSeed: extra.avatarSeed,
        message: extra.message,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        profit: extra.profit
      };

      setMessages((prev) => [...prev.slice(-4), newMessage]); // Keep last 5 messages
      setActiveAlerts((p) => p + Math.floor(Math.random() * 5 - 2)); // fluctuate users online
      index++;
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const now = new Date();
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      username: 'You_Trader_PH',
      avatarSeed: 'you',
      message: inputMessage,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev.slice(-4), userMsg]);
    setInputMessage('');
  };

  return (
    <div className="p-4 rounded-xl border-2 border-[#0A3D91] bg-white shadow-xl relative overflow-hidden flex flex-col justify-between h-[390px]">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5B400]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#0A3D91]/10 text-[#0A3D91]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A3D91]">
                Supportive Community
              </h3>
              <p className="text-[10px] text-gray-500">VIP Telegram Live Chat (PH)</p>
            </div>
          </div>
          <span className="text-[10px] bg-[#0A3D91] border border-[#0A3D91] px-2 py-0.5 rounded-full text-white font-mono font-bold flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span>{activeAlerts} Traders</span>
          </span>
        </div>

        {/* Telegram Chats Area */}
        <div className="space-y-2.5 max-h-[230px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-2.5 rounded-lg border border-gray-200 bg-slate-50 flex items-start gap-2.5 shadow-sm"
              >
                {/* Dicebear style modular avatar replacement */}
                <div className="w-7 h-7 rounded-full bg-[#0A3D91] flex items-center justify-center font-display font-black text-[10px] text-[#F5B400] uppercase flex-shrink-0 shadow-sm">
                  {msg.username.substring(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A3D91] truncate">{msg.username}</span>
                    <span className="text-[9px] text-gray-400 font-mono">{msg.time}</span>
                  </div>

                  <p className="text-[11px] text-[#1F2937] mt-0.5 leading-normal">
                    {msg.message}
                  </p>

                  {msg.profit && (
                    <span className="inline-flex items-center text-[10px] font-mono font-black text-[#16A34A] mt-1 bg-[#16A34A]/10 px-1.5 py-0.5 rounded border border-[#16A34A]/30">
                      {msg.profit}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Input box */}
      <form onSubmit={handleSendMessage} className="mt-2.5 flex items-center gap-1.5 border-t border-gray-200 pt-2.5">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type message and share wins..."
          className="flex-1 bg-slate-100 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#0A3D91]"
        />
        <button
          type="submit"
          className="p-2 bg-[#F5B400] hover:bg-[#e0a400] text-[#1F2937] font-bold rounded-lg cursor-pointer flex-shrink-0 transition active:scale-95 shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
