export interface PersonType {
  createdAt?: string;
  id?: number;
  name: string;
  birthYear: number | undefined | null;
  birthMonth: number | undefined | null;
  birthDay: number | undefined | null;
  gender: undefined | "" | "男性" | "女性" | "その他";
  relationship: undefined | "" | "家族" | "友人" | "知人" | "同僚" | "その他";
  encounterStory: string | undefined;
  imageUrl: string | undefined;
}
