import { getCurrentUser } from "@/lib/auth/api";

export const UserName = async() => {
  const user = await getCurrentUser();
  
  return (
    <div>
      <p>tete</p>
    </div>
  );
}