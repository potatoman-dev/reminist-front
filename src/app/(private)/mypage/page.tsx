import { getCurrentUser } from "@/features/user/api/getCurrentUser";
import { MypageContent } from "@/features/user/components/MypageContent";

const MyPage = async () => {
  const data = await getCurrentUser();

  return (
    <section>
      <h1 className="mb-9 text-3xl font-bold">マイページ</h1>
      <MypageContent data={data} />
    </section>
  );
};

export default MyPage;
