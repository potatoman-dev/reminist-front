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
    <div className="overflow-hidden rounded-2xl border border-border-white shadow shadow-shadow">
      <form onSubmit={onSubmit} className="flex">
        <select
          name="type"
          className="min-w-32 shrink-0 border-r border-border-white bg-white px-14 text-center"
        >
          <option value="name">名前</option>
        </select>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          className="w-full px-3"
        />
        <button
          type="submit"
          className="shrink-0 bg-black px-10 py-3 text-2xl text-white"
        >
          <FiSearch />
        </button>
      </form>
    </div>
  );
};
