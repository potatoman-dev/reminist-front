"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createPerson } from "@/features/person/api/createPerson";
import { PersonType } from "@/features/person/types";

export const PersonForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonType>({
    defaultValues: {
      name: "",
      birthYear: undefined,
      birthMonth: undefined,
      birthDay: undefined,
      gender: undefined,
      relationship: undefined,
      encounterStory: undefined,
      imageUrl: undefined,
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: PersonType) => {
    try {
      // TODO refactor: person.data.person.idはどうにかしたい
      setLoading(true);
      const person = await createPerson(data);
      if (person) {
        console.log("submit:", person);
        console.log("successfully created");
        router.push(`/people/${person.data.person.id}`);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16 w-3/4 max-w-3xl rounded-md bg-background-gray-normal p-6 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 block">
          <label>
            <input
              className="w-full border-b-2 border-background-gray-dark px-1 pb-1 text-2xl font-medium placeholder:text-background-gray-dark focus:outline-none"
              type="text"
              autoComplete="off"
              autoFocus={true}
              {...register("name", { required: "名前は必須です" })}
              placeholder="名前"
            />
          </label>
          {errors.name && (
            <div className="text-red-500 text-xs">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-5 block">
          <label>
            <span className="block pb-1 text-sm font-medium text-text-gray-dark">
              性別
            </span>
            <select {...register("gender")}>
              <option value="">選択してください</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">その他</option>
            </select>
          </label>
          {errors.gender && (
            <div className="text-red-500 text-xs">{errors.gender.message}</div>
          )}
        </div>

        <div className="mb-5 block">
          <label>
            <span className="block pb-1 text-sm font-medium text-text-gray-dark">
              関係性
            </span>
            <select {...register("relationship")}>
              <option value="">選択してください</option>
              <option value="family">家族・親戚</option>
              <option value="friend">友人</option>
              <option value="acquaintance">知人</option>
              <option value="coworker">同僚</option>
              <option value="other">その他</option>
            </select>
          </label>
          {errors.relationship && (
            <div className="text-red-500 text-xs">
              {errors.relationship.message}
            </div>
          )}
        </div>

        <div className="mb-5 block">
          <div className="flex items-baseline gap-4">
            <label className="" htmlFor="birthYear">
              誕生日
            </label>
            <p className="text-xs text-text-gray-dark">??歳</p>
          </div>
          <input
            id="birthYear"
            className="w-[4em] rounded-md border border-background-gray-dark p-1 placeholder:text-background-gray-dark"
            type="number"
            autoComplete="off"
            {...register("birthYear")}
            placeholder="1980"
            min="1900"
            max="2100"
          />
          <span className="mr-4 inline-block">年</span>
          <input
            className="w-[3em] rounded-md border border-background-gray-dark p-1 placeholder:text-background-gray-dark"
            type="number"
            autoComplete="off"
            {...register("birthMonth")}
            placeholder="11"
          />
          <span className="mr-4 inline-block">月</span>
          <input
            className="w-[3em] rounded-md border border-background-gray-dark p-1 placeholder:text-background-gray-dark"
            type="number"
            autoComplete="off"
            {...register("birthDay")}
            placeholder="04"
          />
          <span className="mr-4 inline-block">日</span>
        </div>

        <label>
          <span className="block pb-1 text-sm font-medium text-text-gray-dark">
            出会った経緯
          </span>
          <textarea
            className="w-full rounded-md border border-solid border-background-gray-dark p-2"
            rows={3}
            {...register("encounterStory")}
          />
        </label>
        {loading ? (
          <div className="flex w-48 items-center justify-center rounded-md bg-primary py-3 pr-5 text-white">
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>作成中</span>
          </div>
        ) : (
          <button
            className="w-48 rounded-md bg-primary py-3 text-white"
            type="submit"
          >
            作成
          </button>
        )}
      </form>
    </div>
  );
};
