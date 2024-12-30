import { getCurrentUser } from "@/features/user/api/getCurrentUser";
import { MypageContent } from "@/features/user/components/MypageContent";

const MyPage = async () => {
  const data = await getCurrentUser();

  return (
    <section>
      <h1 className="mb-5 text-2xl font-bold md:mb-9 md:text-3xl">
        マイページ
      </h1>
      <MypageContent data={data} />
    </section>
  );
};

export default MyPage;
