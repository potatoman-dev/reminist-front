import Image from "next/image";
export const Logo = () => {
  return (
    <div className="w-24 md:w-[133px]">
      <Image
              src="/logo.png"
              alt="reminist logo"
              width={133}
              height={23}
            />
    </div>
  );
}