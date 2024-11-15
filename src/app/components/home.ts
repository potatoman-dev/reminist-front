export const GetHomeData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/v1`);
  const data = await res.json();
  return data;
};
