import { getCurrentUser } from "@/features/user/api/getCurrentUser";
import { MypageContent } from "@/features/user/components/MypageContent";

const MyPage = async () => {
  const data = await getCurrentUser();

  return (
    <section>
      <MypageContent data={data} />
    </section>
  );
};

export default MyPage;
