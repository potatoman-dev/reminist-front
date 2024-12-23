"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
export const SearchField = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/people/search?q=${name}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="mx-6 mt-6 max-w-3xl rounded-md border border-background-gray-light bg-white px-3 py-2 md:mx-auto md:mt-16 md:px-6 lg:w-3/4">
      <form
        onSubmit={onSubmit}
        className="flex text-xs md:text-base [&>*]:py-1 md:[&>*]:py-2"
      >
        <select name="type" className="w-14 shrink-0 md:w-32">
          <option value="name">名前</option>
        </select>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          className="w-full border-x-2 border-background-gray-light md:mx-4 md:px-2"
        />
        <button type="submit" className="shrink-0 pl-3 md:px-3">
          検索
        </button>
      </form>
    </div>
  );
};
