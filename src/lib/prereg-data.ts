export interface Character {
  id: string;
  name: string;
  nameEn: string;
  tags: string[];
  bio: string;
}

export const characters: Character[] = [
  {
    id: 'kisa',
    name: '키사',
    nameEn: 'Kisa',
    tags: ['애교', '질투', '미스터리'],
    bio: '강남 모델, 귀엽고 애교 많지만 질투심 강한 소유욕의 여자',
  },
  {
    id: 'jiyeon',
    name: '지연',
    nameEn: 'Jiyeon',
    tags: ['도도한', '시크', 'ISTP'],
    bio: '목공 작업실 겸 위스키 바 운영, 쉽게 마음 열지 않는 시크한 여자',
  },
  {
    id: 'hanabi',
    name: '하나비',
    nameEn: 'Hanabi',
    tags: ['직진형', '반전매력', '쿨한'],
    bio: '레이싱 모델, 겉은 차갑지만 알수록 순수한 직진형 여자',
  },
  {
    id: 'eunbi',
    name: '은비',
    nameEn: 'Eunbi',
    tags: ['ENFP', '책벌레', '감성적'],
    bio: '북촌 도서관 사서, 책 속에 사는 감성적인 ENFP 소녀',
  },
  {
    id: 'rina',
    name: '린아',
    nameEn: 'Rina',
    tags: ['여우형', '솔직', '배려'],
    bio: '청담동 모델, 화려한 겉모습 뒤에 여린 속마음을 가진 여우형 매력',
  },
  {
    id: 'hayun',
    name: '하윤',
    nameEn: 'Hayun',
    tags: ['자유로운', '서핑', '캠핑'],
    bio: '양양 바다 여행 크리에이터, 카메라 뒤의 진짜 모습이 궁금해',
  },
  {
    id: 'youndin',
    name: '욘딘',
    nameEn: 'Youndin',
    tags: ['INFP', '순수', '외유내강'],
    bio: '수원 대학생 모델, 순수하고 귀엽지만 속은 단단한 외유내강 소녀',
  },
  {
    id: 'subin',
    name: '수빈',
    nameEn: 'Subin',
    tags: ['INFP', '수줍은', '순수'],
    bio: '망원동 문구 디자이너, 수줍어서 먼저 말 못하지만 스케치북엔 네 이야기뿐',
  },
];

export interface Feature {
  image: string;
  titleKo: string;
  titleEn: string;
}

export const features: Feature[] = [
  {
    image: '/images/prereg/feature-1.png',
    titleKo: '실제 인플루언서 데이터 기반',
    titleEn: 'Real AI Characters',
  },
  {
    image: '/images/prereg/feature-2.png',
    titleKo: '썸타는 관계에서 연인까지',
    titleEn: 'Real Relationship',
  },
  {
    image: '/images/prereg/feature-3.png',
    titleKo: '대화로 공략하는 미션 & 이벤트',
    titleEn: 'Real Event',
  },
  {
    image: '/images/prereg/feature-4.png',
    titleKo: '캐릭터 기반 공략법을 알려주는',
    titleEn: 'Real Dating Coach',
  },
  {
    image: '/images/prereg/feature-5.png',
    titleKo: '썸타는 그녀의 일상을',
    titleEn: 'Realgram & Instagram',
  },
];

export interface Milestone {
  target: number;
  label: string;
  reward: string;
  icon: string;
}

export const milestones: Milestone[] = [
  { target: 0, label: '전원', reward: '에너지 5개', icon: '⚡' },
  { target: 1000, label: '1,000명', reward: '코인 100개', icon: '🪙' },
  { target: 3000, label: '3,000명', reward: '에너지 30 + 코인 200', icon: '⚡' },
  { target: 5000, label: '5,000명', reward: '에너지 50 + 코인 500', icon: '🔥' },
  { target: 9000, label: '9,000명', reward: '에너지 100 + 코인 1,000', icon: '💎' },
];

export const LAUNCH_DATE = '2026-03-30T09:00:00+09:00';

export const COUNT_MULTIPLIER = Number(process.env.NEXT_PUBLIC_COUNT_MULTIPLIER) || 9;
export const COUNT_SEED = Number(process.env.NEXT_PUBLIC_COUNT_SEED) || 47;

export function getDisplayCount(apiCount: number): number {
  return (apiCount + COUNT_SEED) * COUNT_MULTIPLIER;
}
