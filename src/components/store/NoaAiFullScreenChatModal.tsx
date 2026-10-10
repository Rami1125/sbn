import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  User,
  Building2,
  Image as ImageIcon,
  Video,
  Paintbrush,
  Paperclip,
  CheckCircle2,
  Clock,
  PhoneCall,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight,
  Maximize2,
  Minimize2,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { GoogleMerchantProduct } from '../../types/product';
import { VisualThinkingIndicator } from './VisualThinkingIndicator';
import { ColorTintingModal, TintingRequestData } from './ColorTintingModal';
import { verifyPaintShade, ASSOCIATED_ACCESSORIES } from '../../data/paintShades';
import { SABAN_BRANCHES } from '../../data/initialProducts';
import { useCart } from '../../context/CartContext';

export interface FullChatMessage {
  id: string;
  sender: 'noa' | 'user' | 'desk';
  text: string;
  timestamp: string;
  attachment?: {
    type: 'image' | 'video';
    url: string;
    caption?: string;
  };
  colorSwatch?: {
    name: string;
    code: string;
    hex: string;
    brand: string;
  };
  isTechnician?: boolean;
}

interface NoaAiFullScreenChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: GoogleMerchantProduct;
  onNavigateOrderTrack?: () => void;
  initialMode?: 'noa' | 'desk';
}

const STORAGE_CHAT_KEY = 'saban_noa_full_chat_history_v1';

export const NoaAiFullScreenChatModal: React.FC<NoaAiFullScreenChatModalProps> = ({
  isOpen,
  onClose,
  product,
  onNavigateOrderTrack,
  initialMode = 'noa'
}) => {
  const { addToCart } = useCart();
  const [activePartner, setActivePartner] = useState<'noa' | 'desk'>(initialMode);
  const [selectedBranch, setSelectedBranch] = useState<string>('SABAN_HARASH');
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isTintModalOpen, setIsTintModalOpen] = useState(false);
  const [messages, setMessages] = useState<FullChatMessage[]>([]);
  const [selectedAttachment, setSelectedAttachment] = useState<{
    type: 'image' | 'video';
    url: string;
    caption?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history or create greeting
  useEffect(() => {
    if (!isOpen) return;

    const saved = localStorage.getItem(STORAGE_CHAT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Default seed messages
    const defaultMessages: FullChatMessage[] = [
      {
        id: 'msg-seed-1',
        sender: 'noa',
        text: `שלום! הגעת לחדר הצ׳אט המלא של ח. סבן (סבן שפר). אני נועה Ai, לשירותך 24/7 לכל שאלה טכנית על צבעים, איטום וחומרי בניין. בנוסף, תוכל להעביר את השיחה בלחיצה אחת לאיש דלפק הסניף שלנו.`,
        timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      }
    ];

    if (product) {
      defaultMessages.push({
        id: 'msg-seed-2',
        sender: 'noa',
        text: `פנית בהקשר של: "${product.title}". האם תרצה לבחור גוון ממניפת טמבור/נירלט, לחשב כמויות, או לשלוח תמונה של המשטח לייעוץ?`,
        timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      });
    }

    setMessages(defaultMessages);
  }, [isOpen, product?.id]);

  // Persist messages to LocalStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const currentBranchObj =
    SABAN_BRANCHES.find((b) => (b.id || b.code) === selectedBranch) || SABAN_BRANCHES[0];

  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_CHAT_KEY);
    setMessages([
      {
        id: `clear-${Date.now()}`,
        sender: 'noa',
        text: 'היסטוריית השיחה אופסה. כיצד אוכל לסייע לך כעת?',
        timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const url = URL.createObjectURL(file);
    setSelectedAttachment({
      type: isVideo ? 'video' : 'image',
      url,
      caption: file.name
    });
  };

  const handleSelectPresetAttachment = (type: 'image' | 'video', url: string, name: string) => {
    setSelectedAttachment({
      type,
      url,
      caption: name
    });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !selectedAttachment) return;

    const userMsg: FullChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: inputText.trim() || (selectedAttachment ? 'צירפתי קובץ/תמונה לבדיקה טכנית.' : ''),
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      attachment: selectedAttachment || undefined
    };

    setMessages((prev) => [...prev, userMsg]);
    const sentText = inputText.trim();
    const sentAttachment = selectedAttachment;

    setInputText('');
    setSelectedAttachment(null);

    // AI or Desk Response Simulation
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      if (activePartner === 'desk') {
        // Desk Agent Response
        const deskResponse: FullChatMessage = {
          id: `desk-${Date.now()}`,
          sender: 'desk',
          text: sentAttachment
            ? `שלום, כאן אבי מדלפק סבן סניף החרש 10. קיבלתי את ה${
                sentAttachment.type === 'image' ? 'תמונה' : 'סרטון'
              } ששלחת. לפי מראה השטח, אני ממליץ על יישום שתי שכבות עם שכבת יסוד מקשרת תחילה. מכין לך את המענה בדלפק.`
            : `שלום, כאן אבי מדלפק סבן. לגבי "${sentText}": הפריטים זמינים במלאי הסניף לאיסוף מהיר ברציף 3. האם תרצה שנכין את ההזמנה מראש לקראת הגעתך?`,
          timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
          isTechnician: true
        };
        setMessages((prev) => [...prev, deskResponse]);
      } else {
        // Noa Ai Response with shade verification logic
        const verified = verifyPaintShade(sentText);
        let respText = '';
        let swatch = undefined;

        if (sentAttachment) {
          respText = `ניתחתי את ה${
            sentAttachment.type === 'image' ? 'תמונה' : 'סרטון'
          } באמצעות מערכת הראייה של נועה Ai: המשטח דורש ניקוי מאבק, מריחת פריימר קושר, ויישום צבע אקרילי רחיץ בשתי שכבות. לתוצאה מושלמת מומלץ רולר מיקרופייבר ומברשת פינות.`;
        } else if (verified.isValid && verified.shade) {
          respText = `הגוון ${verified.shade.name} (קוד ${verified.shade.code}) אומת בהצלחה מול מאגר ${verified.shade.brand} הרשמי! כושר הכיסוי מחושב אוטומטית, ובקשת הגיוון מוכנה להעברה לסניף.`;
          swatch = {
            name: verified.shade.name,
            code: verified.shade.code,
            hex: verified.shade.hex,
            brand: verified.shade.brand
          };
        } else if (sentText.includes('ייבוש') || sentText.includes('שכבות')) {
          respText = `זמן ייבוש למגע: כשעתיים. זמן המתנה בין שכבה ראשונה לשנייה: 3-4 שעות (בטמפרטורת חדר 25 מעלות). ייבוש מלא וסופי לרחיצה: 72 שעות.`;
        } else {
          respText = `רשמתי לפניי. תשובה הנדסית: עבור הדרישה שהצגת, מומלץ לעבוד לפי הוראות תקן ישראלי 1536 / תו תקן לצבעי מים. תרצה שאעביר אותך לאיש הדלפק בסניף או לפתוח את מניפת הגוונים?`;
        }

        const noaResponse: FullChatMessage = {
          id: `noa-${Date.now()}`,
          sender: 'noa',
          text: respText,
          timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
          colorSwatch: swatch
        };
        setMessages((prev) => [...prev, noaResponse]);
      }
    }, 900);
  };

  const handleConfirmTintFromModal = (data: TintingRequestData) => {
    const tintMsg: FullChatMessage = {
      id: `noa-tint-full-${Date.now()}`,
      sender: 'noa',
      text: `הזמנת גיוון נפתחה בהצלחה: גוון ${data.shadeName} (${data.shadeCode}) ב${data.supplier}, גודל ${data.packageSize}. נשלח לסניף ${data.branchName} (כרטיס טיפול #${data.ticketId}).`,
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      colorSwatch: {
        name: data.shadeName,
        code: data.shadeCode,
        hex: data.shadeHex,
        brand: data.supplier
      }
    };
    setMessages((prev) => [...prev, tintMsg]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center sm:p-4">
      {/* Container - Fullscreen on mobile, elevated large modal on desktop */}
      <div className="bg-white w-full h-full sm:h-[92vh] sm:max-w-5xl sm:rounded-3xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in duration-200">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0F3E7A] to-[#124b94] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Left Title and Partner Switcher */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20 shrink-0">
              {activePartner === 'noa' ? (
                <Sparkles className="w-6 h-6 animate-pulse" />
              ) : (
                <Building2 className="w-6 h-6 text-[#0F3E7A]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">
                  חדר צ׳אט מלא – {activePartner === 'noa' ? 'נועה Ai' : 'איש דלפק סבן'}
                </h2>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-xs text-blue-200 flex items-center gap-2">
                <span>{currentBranchObj.name} ({currentBranchObj.subName})</span>
                <span>•</span>
                <span>פעיל בזמן אמת</span>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mr-auto sm:mr-0">
            <div className="bg-black/30 p-1 rounded-2xl flex items-center gap-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActivePartner('noa')}
                className={`px-3 py-1.5 rounded-xl font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePartner === 'noa'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>נועה Ai</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePartner('desk')}
                className={`px-3 py-1.5 rounded-xl font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePartner === 'desk'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>איש דלפק בסניף</span>
              </button>
            </div>

            {/* Quick Actions */}
            <button
              onClick={() => setIsTintModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="פתח מניפת גוונים"
            >
              <Paintbrush className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">מניפה</span>
            </button>

            {onNavigateOrderTrack && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateOrderTrack();
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="מעקב הזמנות"
              >
                <Package className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">מעקב</span>
              </button>
            )}

            <button
              onClick={handleClearHistory}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl text-xs transition-colors cursor-pointer"
              title="נקה היסטוריית שיחה"
            >
              <Trash2 className="w-4 h-4 text-slate-300" />
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub Header Notice */}
        <div className="bg-slate-100 px-4 py-2 text-xs text-slate-600 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {activePartner === 'noa'
                ? 'שיחה מול נועה Ai – מענה מקצועי, אפקט חשיבה ויזואלית ואימות גווני טמבור ונירלט.'
                : 'שיחה ישירה מול דלפק הסניף – תיאום איסוף מהיר, בדיקת מלאי ואישור גוונים.'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
            <span>סניף נבחר:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2 py-0.5 text-xs font-bold"
            >
              {SABAN_BRANCHES.map((b) => (
                <option key={b.id || b.code} value={b.id || b.code}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chat Stream Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/70">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isDesk = msg.sender === 'desk';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1 font-mono">
                  <span>
                    {isUser ? 'אתה (לקוח/קבלן)' : isDesk ? 'איש דלפק סבן' : 'נועה Ai (יועצת סבן)'}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-[#0F3E7A] text-white rounded-br-none'
                      : isDesk
                      ? 'bg-amber-50 border border-amber-200 text-slate-900 rounded-bl-none'
                      : 'bg-white border border-slate-200 text-slate-900 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Attachment Preview in Message */}
                  {msg.attachment && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-black/10 bg-black/5">
                      {msg.attachment.type === 'image' ? (
                        <img
                          src={msg.attachment.url}
                          alt={msg.attachment.caption || 'קובץ מצורף'}
                          className="max-h-60 w-full object-cover"
                        />
                      ) : (
                        <video
                          src={msg.attachment.url}
                          controls
                          className="max-h-60 w-full object-cover bg-black"
                        />
                      )}
                      {msg.attachment.caption && (
                        <div className="p-2 text-[11px] font-bold bg-white/80 text-slate-700">
                          {msg.attachment.caption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Color Swatch Display in Message */}
                  {msg.colorSwatch && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl border border-black/10 shadow-inner shrink-0"
                        style={{ backgroundColor: msg.colorSwatch.hex }}
                      />
                      <div>
                        <div className="text-[10px] font-bold text-amber-600 uppercase">
                          קוביית צבע מאומתת • {msg.colorSwatch.brand}
                        </div>
                        <div className="font-extrabold text-slate-900 text-sm">
                          {msg.colorSwatch.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          קוד: {msg.colorSwatch.code} | {msg.colorSwatch.hex}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Visual Thinking while waiting for response */}
          {isThinking && (
            <div className="my-2">
              <VisualThinkingIndicator
                statusText={
                  activePartner === 'desk'
                    ? 'איש הדלפק בודק את המלאי ומתאם מענה...'
                    : 'נועה Ai מעבדת את שאלתך ומאמתת מפרט טכני...'
                }
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Staged Attachment Preview Bar */}
        {selectedAttachment && (
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900 shrink-0">
            <div className="flex items-center gap-2">
              {selectedAttachment.type === 'image' ? (
                <ImageIcon className="w-4 h-4 text-amber-700" />
              ) : (
                <Video className="w-4 h-4 text-amber-700" />
              )}
              <span className="font-bold">קובץ מוכן לשליחה: {selectedAttachment.caption}</span>
            </div>
            <button
              onClick={() => setSelectedAttachment(null)}
              className="text-amber-800 hover:text-red-600 font-bold p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Sample Photos Selector for User */}
        <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-600 shrink-0">
          <span className="font-bold shrink-0">שלח דוגמה מהירה:</span>
          <button
            type="button"
            onClick={() =>
              handleSelectPresetAttachment(
                'image',
                'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
                'קיר עם התקלפויות צבע ישן'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            📷 תמונת קיר מתקלף
          </button>
          <button
            type="button"
            onClick={() =>
              handleSelectPresetAttachment(
                'image',
                'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
                'משטח בטון וסדקי רולקה'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            📷 תמונת משטח בטון
          </button>
          <button
            type="button"
            onClick={() =>
              handleSelectPresetAttachment(
                'image',
                'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
                'מעקה מתכת עם חלודה קלה'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            📷 תמונת מעקה מתכת
          </button>
          <button
            type="button"
            onClick={() =>
              handleSelectPresetAttachment(
                'video',
                'https://tv-tawny-kappa.vercel.app/videos/saban-noa-ai.mp4',
                'סרטון קצר של אזור העבודה'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            🎥 סרטון שטח קצר
          </button>
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          {/* File attachment trigger */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="צרף תמונה או סרטון מהמכשיר"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              activePartner === 'noa'
                ? 'כתוב לנועה: שאלה טכנית, קוד מניפה, כושר כיסוי, הכנת שטח...'
                : 'כתוב לאיש הדלפק: שאלה על מלאי, הכנת הזמנה, או שעת הגעה לסניף...'
            }
            className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F3E7A] focus:bg-white transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim() && !selectedAttachment}
            className="bg-[#0F3E7A] hover:bg-[#0A2E5C] disabled:opacity-40 text-white px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>שלח</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* Tinting Modal Overlay inside Full Chat */}
      <ColorTintingModal
        isOpen={isTintModalOpen}
        onClose={() => setIsTintModalOpen(false)}
        onConfirmTint={handleConfirmTintFromModal}
        initialSupplier={product?.title.includes('נירלט') ? 'נירלט' : 'טמבור'}
        productTitle={product?.title}
      />
    </div>
  );
};
