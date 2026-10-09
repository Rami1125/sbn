export interface SabanClubMember {
  cardId: string;
  fullName: string;
  phone: string;
  email?: string;
  businessName?: string;
  contractorType?: string;
  preferredBranch?: string;
  projectAddress?: string;
  projectNotes?: string;
  joinedDate: string;
  tier?: 'silver' | 'gold' | 'vip';
  discountPercent?: number;
  lastLogin?: string;
}

const STORAGE_KEY_LOGGED_IN = 'saban_club_logged_in_member';
const STORAGE_KEY_MEMBERS_LIST = 'saban_club_registered_members_v1';

// Seed default contractor if none exists
export function getSavedMembers(): SabanClubMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MEMBERS_LIST);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }

  // Initial seed demo member
  const defaultMember: SabanClubMember = {
    cardId: 'SBN-CLUB-889413',
    fullName: 'יוסי לוי',
    phone: '050-8860896',
    email: 'yossi.build@gmail.com',
    businessName: 'לוי הנדסה וגמר בע״מ',
    contractorType: 'קבלן שלד ושלד-בטון',
    preferredBranch: 'החרש 10 (מרכז לוגיסטי)',
    projectAddress: 'רחוב דרך רמתיים 42, הוד השרון',
    projectNotes: 'וילה פרטית, שלב יציקות ועבודות איטום',
    joinedDate: '15/01/2026',
    tier: 'vip',
    discountPercent: 12
  };

  saveMemberToList(defaultMember);
  return [defaultMember];
}

export function saveMemberToList(member: SabanClubMember) {
  try {
    const list = getSavedMembers().filter(m => m.phone !== member.phone && m.cardId !== member.cardId);
    list.unshift(member);
    localStorage.setItem(STORAGE_KEY_MEMBERS_LIST, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function getLoggedInMember(): SabanClubMember | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGGED_IN);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return null;
}

export function setLoggedInMember(member: SabanClubMember | null) {
  try {
    if (member) {
      const withTimestamp = {
        ...member,
        lastLogin: new Date().toLocaleDateString('he-IL', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      };
      localStorage.setItem(STORAGE_KEY_LOGGED_IN, JSON.stringify(withTimestamp));
      localStorage.setItem('saban_customer_phone', member.phone);
      // Also update in registered list
      saveMemberToList(withTimestamp);
    } else {
      localStorage.removeItem(STORAGE_KEY_LOGGED_IN);
    }
  } catch {
    // ignore
  }
}

export function findMemberByPhoneOrCard(identifier: string): SabanClubMember | null {
  const clean = identifier.replace(/[-\s]/g, '').trim().toLowerCase();
  const list = getSavedMembers();
  return list.find(m => {
    const mPhone = m.phone.replace(/[-\s]/g, '').toLowerCase();
    const mCard = m.cardId.replace(/[-\s]/g, '').toLowerCase();
    return mPhone === clean || mPhone.endsWith(clean) || mCard === clean || m.fullName.toLowerCase().includes(clean);
  }) || null;
}
