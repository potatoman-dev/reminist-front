import Link from "next/link";

import { PublicHeader } from "@/components/Header/PublicHeader";

const NotFound = () => {
  return (
    <div>
      <PublicHeader />
      <div className="pt-20">
        <h1 className="text-center text-2xl font-bold">404 Not Found</h1>
        <p className="mt-3 text-center font-bold text-gray">
          ページが見つかりませんでした。
        </p>
        <div className="mt-20 flex justify-center">
          <Link
            className="rounded-full border border-border-white bg-primary px-10 py-3 text-lg font-medium text-white shadow shadow-shadow"
            href="/signin"
          >
            ログインはこちら
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
