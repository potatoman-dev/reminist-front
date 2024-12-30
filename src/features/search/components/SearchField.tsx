"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
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
    <div className="overflow-hidden rounded-xl border border-border-white shadow shadow-shadow md:rounded-2xl">
      <form onSubmit={onSubmit} className="flex">
        <select
          name="type"
          className="min-w-20 shrink-0 border-r border-border-white bg-white pl-4 pr-8 text-center text-sm md:min-w-32 md:px-14 md:text-base"
        >
          <option value="name">名前</option>
        </select>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          className="w-full px-1.5 md:px-3"
        />
        <button
          type="submit"
          className="shrink-0 bg-black px-4 py-3 text-lg text-white md:px-10 md:text-2xl"
        >
          <FiSearch />
        </button>
      </form>
    </div>
  );
};
