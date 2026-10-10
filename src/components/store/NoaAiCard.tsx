import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Paintbrush,
  Maximize2,
  Check,
  CheckCircle2,
  Package,
  Layers,
  HelpCircle,
  ShoppingBag,
  ExternalLink,
  MessageSquare,
  Play,
  Pause,
  Video,
  ShieldCheck,
  Building2,
  ChevronLeft
} from 'lucide-react';
import { GoogleMerchantProduct } from '../../types/product';
import { VisualThinkingIndicator } from './VisualThinkingIndicator';
import {
  PaintShade,
  ASSOCIATED_ACCESSORIES,
  AssociatedProduct,
  verifyPaintShade,
  ALL_SHADES
} from '../../data/paintShades';
import { useCart } from '../../context/CartContext';
import { ColorTintingModal, TintingRequestData } from './ColorTintingModal';

export interface ChatMessage {
  id: string;
  sender: 'noa' | 'user' | 'desk';
  text: string;
  timestamp: string;
  colorSwatch?: {
    name: string;
    code: string;
    hex: string;
    brand: string;
  };
  suggestedActions?: {
    id: string;
    label: string;
    icon?: string;
    action: () => void;
  }[];
  associatedProducts?: AssociatedProduct[];
}

interface NoaAiCardProps {
  product: GoogleMerchantProduct;
  onOpenFullChat: () => void;
  onOpenColorModal?: () => void;
  onSelectShade?: (shade: { name: string; code: string; hex: string }) => void;
  onOpenOrderTrack?: () => void;
}

export const NoaAiCard: React.FC<NoaAiCardProps> = ({
  product,
  onOpenFullChat,
  onOpenColorModal,
  onSelectShade,
  onOpenOrderTrack
}) => {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingMilestone, setThinkingMilestone] = useState<string>('');
  const [isTintModalOpen, setIsTintModalOpen] = useState(false);
  const [activePaintType, setActivePaintType] = useState<'קיר' | 'מתכת' | 'עץ'>('קיר');
  const [confirmedTint, setConfirmedTint] = useState<TintingRequestData | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [mediaMode, setMediaMode] = useState<'image' | 'video'>('image');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Default product FAQ items
  const productFaqs = [
    {
      q: 'מה כושר הכיסוי וזמן הייבוש?',
      a: `${product.title} מכסה בממוצע ${
        product.coverageInfo?.ratePerM2 || '12-14 מ״ר'
      } לליטר/יחידה. ייבוש למגע: ${product.dryingTime?.touch || 'כשעתיים'}, שכבה שנייה לאחר: ${
        product.dryingTime?.recoat || '3-4 שעות'
      }.`
    },
    {
      q: 'איזה גוון הכי מומלץ לקירות סלון?',
      a: 'הגוונים המובילים כרגע הם 0021 (לבן שמנת חם) ו-0524T (אפור בטון עדין) של טמבור, או IS 0010 (אקסטרה לבן אריסטו) של נירלט. לחץ על "פתח קטלוג גוונים" לבחירה.'
    },
    {
      q: 'האם המוצר דורש יסוד (פריימר)?',
      a: product.coverageInfo?.prepNotes ||
        'על גבי תשתית חדשה או שפכטל מומלץ ליישם יסוד קושר (בונדרול סופר) לקבלת הידבקות מרבית ומניעת ספיגת יתר.'
    },
    {
      q: 'האם ניתן לאסוף היום מסניפי סבן?',
      a: 'כן! מוצר זה זמין לאיסוף מיידי ברציף BOPIS בסניף החרש 10 ובסניף התלמיד 6, ללא תור בדלפק.'
    }
  ];

  // Initialize Welcome Message
  useEffect(() => {
    const isPaintProduct =
      product.title.includes('צבע') ||
      product.title.includes('סופרקריל') ||
      product.title.includes('אקווניר') ||
      product.title.includes('טמבור') ||
      product.title.includes('נירלט');

    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      sender: 'noa',
      text: `שלום! אני נועה Ai, יועצת הבנייה והצבע של ח. סבן. ${
        isPaintProduct
          ? 'אני יכולה לאמת עבורך גוונים ממניפת טמבור ונירלט, לחשב כמויות מדויקות ולשלוח הזמנת גיוון לסניף.'
          : `אני לשירותך עם מפרט טכני, חישוב כמויות ותווי תקן עבור ${product.title}.`
      }`,
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        {
          id: 'action-fan',
          label: '🎨 פתח קטלוג גוונים',
          action: () => setIsTintModalOpen(true)
        },
        {
          id: 'action-faq-coverage',
          label: '📐 כושר כיסוי וזמני ייבוש',
          action: () => handleAskFaq(productFaqs[0].q, productFaqs[0].a)
        },
        {
          id: 'action-desk-switch',
          label: '💬 מעבר לצ׳אט עם איש דלפק',
          action: onOpenFullChat
        }
      ]
    };

    setMessages([welcomeMsg]);
  }, [product.id]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleAskFaq = (question: string, answer: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);

    setIsThinking(true);
    setThinkingMilestone('מעבדת שאלה טכנית מול נתוני המפרט הרשמי...');

    setTimeout(() => {
      setIsThinking(false);
      const noaMsg: ChatMessage = {
        id: `noa-${Date.now()}`,
        sender: 'noa',
        text: answer,
        timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          {
            id: 'act-fan-2',
            label: '🎨 בחר גוון',
            action: () => setIsTintModalOpen(true)
          },
          {
            id: 'act-calc',
            label: '💬 שאל שאלה נוספת',
            action: () => setInputValue('כמה פחים אצטרך לדירת 4 חדרים?')
          }
        ]
      };
      setMessages((prev) => [...prev, noaMsg]);
    }, 700);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);
    setThinkingMilestone('מאמתת נתונים, קוד מניפה ומפרט טכני...');

    setTimeout(() => {
      setIsThinking(false);

      // Analyze user input for tint code or general query
      const verified = verifyPaintShade(userText);
      let responseText = '';
      let colorSwatchObj = undefined;
      let associated: AssociatedProduct[] | undefined = undefined;

      if (verified.isValid && verified.shade) {
        responseText = `מצאתי ואימתתי עבורך את הגוון ${verified.shade.name} (קוד ${verified.shade.code}) ממניפת ${verified.shade.brand}. ${verified.shade.description}`;
        colorSwatchObj = {
          name: verified.shade.name,
          code: verified.shade.code,
          hex: verified.shade.hex,
          brand: verified.shade.brand
        };
        // Auto recommend associated products
        associated = ASSOCIATED_ACCESSORIES[activePaintType];
      } else if (userText.includes('כמות') || userText.includes('מטר') || userText.includes('חדר')) {
        responseText = `לדירת 4 חדרים סטנדרטית (כ-100 מ״ר שטח רצפה, שטח קירות כ-260 מ״ר) מומלץ להצטייד ב-2 עד 2.5 פחים של 18 ליטר לשתי שכבות מלאות. ממליצה להוסיף רולר מקצועי וניילון כיסוי.`;
        associated = ASSOCIATED_ACCESSORIES['קיר'];
      } else {
        responseText = `לגבי שאלתך: עבור ${product.title}, היישום מבוצע בהתאם לת״י ומפרט היצרן. זקוק לבירור נוסף או ברצונך לדבר עם איש הדלפק בסניף?`;
      }

      const noaMsg: ChatMessage = {
        id: `noa-${Date.now()}`,
        sender: 'noa',
        text: responseText,
        timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
        colorSwatch: colorSwatchObj,
        associatedProducts: associated,
        suggestedActions: [
          {
            id: 'act-fan-confirm',
            label: '🎨 פתח קטלוג גוונים מלא',
            action: () => setIsTintModalOpen(true)
          },
          {
            id: 'act-desk',
            label: '👨‍🔧 המשך שיחה עם איש דלפק',
            action: onOpenFullChat
          }
        ]
      };

      setMessages((prev) => [...prev, noaMsg]);
    }, 800);
  };

  const handleConfirmTint = (data: TintingRequestData) => {
    setConfirmedTint(data);
    setActivePaintType(data.paintType);

    if (onSelectShade) {
      onSelectShade({
        name: data.shadeName,
        code: data.shadeCode,
        hex: data.shadeHex
      });
    }

    const accessories = ASSOCIATED_ACCESSORIES[data.paintType];

    const tintSuccessMsg: ChatMessage = {
      id: `noa-tint-${Date.now()}`,
      sender: 'noa',
      text: `מצוין! נוצרה בקשת גיוון ממוחשבת מספר #${data.ticketId} לגוון ${data.shadeName} (${data.shadeCode}) ב${data.supplier} בגודל ${data.packageSize}. ההזמנה הועברה לסניף ${data.branchName}.`,
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      colorSwatch: {
        name: data.shadeName,
        code: data.shadeCode,
        hex: data.shadeHex,
        brand: data.supplier
      },
      associatedProducts: accessories,
      suggestedActions: [
        {
          id: 'act-track',
          label: '📦 פתח מעקב הזמנה וסטטוס גיוון',
          action: () => onOpenOrderTrack && onOpenOrderTrack()
        },
        {
          id: 'act-fullchat',
          label: '💬 צ׳אט עם איש הדלפק בסניף',
          action: onOpenFullChat
        }
      ]
    };

    setMessages((prev) => [...prev, tintSuccessMsg]);
  };

  const handleAddAssociated = (item: AssociatedProduct) => {
    addToCart(
      {
        ...product,
        id: item.id,
        title: item.title,
        price: `${item.price.toFixed(2)} ILS`,
        sale_price: undefined,
        image_link: item.image_link
      },
      1
    );
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2500);
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlayingVideo) {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    } else {
      videoRef.current.play();
      setIsPlayingVideo(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-amber-400/40 shadow-xl overflow-hidden text-slate-800">
      
      {/* Top Banner: Media + AI Header */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0F3E7A] to-[#0A2E5C] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-200 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/25">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black tracking-wide">
                נועה Ai – יועצת צבע וחומרי בניין
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm">
                טמבור • נירלט • סבן
              </span>
            </div>
            <p className="text-xs text-blue-200">
              מענה טכני מיידי, אפקט חשיבה ויזואלית, גיוון צבעים ממוחשב ומוצרים קשורים
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2 mr-auto sm:mr-0">
          {product.video_link && (
            <button
              onClick={() => setMediaMode(mediaMode === 'video' ? 'image' : 'video')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mediaMode === 'video'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{mediaMode === 'video' ? 'חזור לתמונה' : 'סרטון מוצר'}</span>
            </button>
          )}

          <button
            onClick={() => setIsTintModalOpen(true)}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Paintbrush className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">מניפת גוונים</span>
            <span className="sm:hidden">גוון</span>
          </button>

          <button
            onClick={onOpenFullChat}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title="פתח חדר צ׳אט מלא עם נועה ואיש דלפק"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional Media Preview Bar (Image or Video) */}
      {mediaMode === 'video' && product.video_link && (
        <div className="relative bg-black aspect-video w-full max-h-72 overflow-hidden border-b border-slate-200">
          <video
            ref={videoRef}
            src={product.video_link}
            poster={product.image_link}
            controls
            className="w-full h-full object-contain"
            onPlay={() => setIsPlayingVideo(true)}
            onPause={() => setIsPlayingVideo(false)}
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>סרטון הדרכה ויישום של סבן</span>
          </div>
        </div>
      )}

      {/* Main Interactive Chat Flow Area */}
      <div className="p-4 sm:p-5 space-y-4">
        
        {/* Quick FAQ Pills Carousel */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>שאלות נפוצות ושירות לקוחות מהיר:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1.5 text-xs">
            {productFaqs.map((faq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAskFaq(faq.q, faq.a)}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#0F3E7A] hover:border-blue-200 border border-slate-200 whitespace-nowrap text-slate-700 transition-colors cursor-pointer shrink-0 font-medium"
              >
                {faq.q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1 pl-1">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1 font-mono">
                  <span>{isUser ? 'אתה' : msg.sender === 'desk' ? 'איש דלפק סבן' : 'נועה Ai'}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#0F3E7A] text-white rounded-br-none shadow-sm'
                      : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200/80 shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Visual Color Swatch in Chat (קוביית צבע ויזואלית) */}
                  {msg.colorSwatch && (
                    <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl border border-black/10 shadow-inner shrink-0"
                        style={{ backgroundColor: msg.colorSwatch.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-amber-600 uppercase">
                          קוביית גוון מאומתת • {msg.colorSwatch.brand}
                        </div>
                        <div className="font-extrabold text-slate-900 text-sm truncate">
                          {msg.colorSwatch.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          קוד: {msg.colorSwatch.code} | HEX: {msg.colorSwatch.hex}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Associated Products Carousel (שילוב מוצרים קשורים אוטומטי) */}
                  {msg.associatedProducts && msg.associatedProducts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                        <span className="flex items-center gap-1 text-[#0F3E7A]">
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                          <span>נועה מציעה מוצרים משלימים לצביעה מושלמת:</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.associatedProducts.map((acc) => (
                          <div
                            key={acc.id}
                            className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                          >
                            <img
                              src={acc.image_link}
                              alt={acc.title}
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                            />
                            <div className="min-w-0 flex-1 text-right">
                              <div className="text-[11px] font-bold text-slate-900 truncate">
                                {acc.title}
                              </div>
                              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                <span className="font-bold text-emerald-700">₪{acc.price.toFixed(2)}</span>
                                {acc.originalPrice && (
                                  <span className="line-through text-slate-400">
                                    ₪{acc.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleAddAssociated(acc)}
                              className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                                addedItemIds[acc.id]
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs'
                              }`}
                              title="הוסף לסל"
                            >
                              {addedItemIds[acc.id] ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <span className="flex items-center gap-1 font-extrabold text-[11px]">
                                  +סל
                                </span>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contextual Action Buttons */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((act) => (
                        <button
                          key={act.id}
                          type="button"
                          onClick={act.action}
                          className="px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-slate-800 text-[11px] font-bold border border-slate-300 hover:border-slate-400 transition-colors cursor-pointer shadow-xs"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Visual Thinking Indicator while thinking */}
          {isThinking && (
            <div className="my-2">
              <VisualThinkingIndicator statusText={thinkingMilestone} />
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 pt-2 border-t border-slate-100">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="שאל את נועה על גוון, קוד טמבור/נירלט, או כמויות..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F3E7A] focus:bg-white transition-all"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-[#0F3E7A] hover:bg-[#0A2E5C] disabled:opacity-40 text-white p-3 rounded-2xl transition-all cursor-pointer shadow-md"
            title="שלח שאלה"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Fast Track Links */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>סניף החרש 10 והתלמיד 6 פתוחים לגיוון ממוחשב מיידי</span>
          </div>
          <button
            onClick={onOpenFullChat}
            className="text-[#0F3E7A] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
          >
            <span>פתח חדר צ׳אט מלא (דסקטופ ומובייל)</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Color Tinting Fan Modal */}
      <ColorTintingModal
        isOpen={isTintModalOpen}
        onClose={() => setIsTintModalOpen(false)}
        onConfirmTint={handleConfirmTint}
        initialSupplier={product.title.includes('נירלט') ? 'נירלט' : 'טמבור'}
        productTitle={product.title}
      />
    </div>
  );
};
