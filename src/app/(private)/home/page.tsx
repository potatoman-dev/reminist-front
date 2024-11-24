// import { getCurrentUser } from '@/libs/auth/auth';

const HomePage = async () => {
  // const data = await getCurrentUser();
  // console.log(data);
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
