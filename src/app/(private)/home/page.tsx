import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const HomePage = async () => {
  await getCurrentUser();

  const data = "";

  return (
    <div>
      {
        <h1>
          <p>{data}</p>Home Page
        </h1>
      }
    </div>
  );
};

export default HomePage;
