export interface PersonType {
  id?: number;
  name: string;
  birthYear: number | null;
  birthMonth: number | null;
  birthDay: number | null;
  gender: "" | "男性" | "女性" | "その他";
  relationship: "" | "家族" | "友人" | "知人" | "同僚" | "その他";
  encounterStory: Text;
  imageUrl: string;
}
