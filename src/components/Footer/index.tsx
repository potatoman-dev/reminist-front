import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex justify-end gap-4 bg-white px-4 py-3 text-xs text-text-gray-dark md:gap-6 md:px-8 md:py-4 md:text-sm">
      <Link className="" href="/terms-of-use" target="_blank">
        利用規約
      </Link>
      <Link className="" href="/privacy-policy" target="_blank">
        プライバシーポリシー
      </Link>
      <Link className="" href="/contact" target="_blank">
        お問い合わせ
      </Link>
    </footer>
  );
};
