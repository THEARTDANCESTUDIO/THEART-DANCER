
export type Language = 'ko' | 'en' | 'ja' | 'zh';

export interface Dancer {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface SiteConfig {
  studioName: string;
  logoUrl: string;
}
