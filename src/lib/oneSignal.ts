// OneSignal Web Push Integration & Real-Time Chime Audio Engine
// For ח. סבן חומרי בניין (1994) בע״מ

declare global {
  interface Window {
    OneSignalDeferred?: Array<(OneSignal: any) => void>;
    OneSignal?: any;
  }
}

// Default OneSignal App ID for Saban Pro PWA
export const ONESIGNAL_APP_ID = 'e3d489b0-saban-9518888-pro-push';

let isInitialized = false;

/**
 * Initializes the OneSignal SDK safely in client environment
 */
export function initOneSignal(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    try {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false // We use our custom UI
        }
      });
      isInitialized = true;
      console.log('[OneSignal] Initialized successfully for Saban PWA');
    } catch (err) {
      console.warn('[OneSignal Init Warning]', err);
    }
  });

  // Inject SDK script tag dynamically if not present
  if (!document.getElementById('onesignal-sdk-script')) {
    const script = document.createElement('script');
    script.id = 'onesignal-sdk-script';
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
    script.defer = true;
    document.head.appendChild(script);
  }
}

/**
 * Associates user with customer telephone number (External User ID)
 */
export function setCustomerExternalPhone(phoneNumber: string): void {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  if (!cleanPhone) return;

  // Persist locally for immediate reference
  localStorage.setItem('saban_customer_phone', cleanPhone);

  if (typeof window !== 'undefined' && window.OneSignalDeferred) {
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      try {
        if (OneSignal.login) {
          await OneSignal.login(cleanPhone);
        }
        if (OneSignal.User && OneSignal.User.addTag) {
          OneSignal.User.addTag('phone', cleanPhone);
          OneSignal.User.addTag('saban_client_type', 'contractor_pro');
        }
        console.log(`[OneSignal] User associated with phone: ${cleanPhone}`);
      } catch (err) {
        console.warn('[OneSignal Login Warning]', err);
      }
    });
  }
}

/**
 * High-Fidelity Professional Chime Synthesizer using Web Audio API
 * Plays a pleasant two-tone chime (F#5 -> C#6 harmonics) when an order is ready
 */
export function playOrderReadyChime(): void {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Tone 1: 740 Hz (F#5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(739.99, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.3, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.65);

    // Tone 2: 1108 Hz (C#6)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1108.73, now + 0.18);
    gain2.gain.setValueAtTime(0, now + 0.18);
    gain2.gain.linearRampToValueAtTime(0.35, now + 0.22);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.18);
    osc2.stop(now + 1.2);

    // Harmonizer shimmer (soft overtone)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(1479.98, now + 0.2);
    gain3.gain.setValueAtTime(0, now + 0.2);
    gain3.gain.linearRampToValueAtTime(0.1, now + 0.25);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start(now + 0.2);
    osc3.stop(now + 0.9);
  } catch (err) {
    console.warn('[Audio Chime Error]', err);
  }
}

/**
 * Triggers interactive simulation of order readiness (plays chime + browser notification)
 */
export async function triggerOrderReadySimulation(orderNumber: string, branchName: string): Promise<boolean> {
  // 1. Play crystal clear melodic chime
  playOrderReadyChime();

  // 2. Browser Web Notification if allowed
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      try {
        new Notification('ח. סבן - ההזמנה מוכנה לאיסוף! 🏗️', {
          body: `הזמנה #${orderNumber} ממתינה לך ארוזה ברציף האיסוף ב${branchName}. נציג סבן מחכה לך ללא תור!`,
          icon: '/pwa-192x192.png',
          tag: `order-${orderNumber}`
        });
        return true;
      } catch (e) {
        console.warn('[Notification Error]', e);
      }
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('ח. סבן - ההזמנה מוכנה לאיסוף! 🏗️', {
          body: `הזמנה #${orderNumber} מוכנה ברציף ${branchName}.`,
          icon: '/pwa-192x192.png'
        });
        return true;
      }
    }
  }

  return true;
}
