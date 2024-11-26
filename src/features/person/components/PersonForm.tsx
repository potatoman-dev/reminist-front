"use client";

import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

import { PersonType } from "@/features/person/types";

const imageList = [
  "default",
  "black",
  "lightgreen",
  "gray",
  "orange",
  "pink",
  "purple",
  "red",
  "lightblue",
  "yellow",
];

interface PersonFormProps {
  handleSelectImage: (image: string) => void;
  loading: boolean;
  selectedImage: string | undefined;
  defaultValues?: PersonType;
  onSubmit: SubmitHandler<PersonType>;
  buttonText: string;
}

export const PersonForm = (props: PersonFormProps) => {
  const defaultValues = props.defaultValues;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonType>({
    defaultValues,
  });

  const imageSelector = imageList.map((image) => (
    <span
      key={image}
      onClick={() => props.handleSelectImage(image)}
      className={`w-full cursor-pointer rounded-lg border-2 bg-white px-1 py-0.5 md:px-2 md:py-1 ${image === props.selectedImage ? "border-primary-variant" : "border-white md:border-background-gray-light"}`}
    >
      <Image
        className="w-auto"
        src={`/image/people/${image}.png`}
        alt="ヒトの画像"
        width={100}
        height={100}
      />
    </span>
  ));

  return (
    <div className="">
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <div className="items-start gap-10 md:flex">
          <div className="mt-4 hidden w-1/3 flex-col items-center gap-10 md:flex">
            <Image
              className="w-24"
              src={`/image/people/${props.selectedImage}.png`}
              alt="ヒトの画像"
              width={100}
              height={100}
            />
            <div className="grid grid-cols-3 gap-1">{imageSelector}</div>
          </div>
          <div className="w-full rounded-lg bg-white p-6 shadow-sm md:p-10">
            <div className="mb-5 block">
              <label>
                <span className="block pb-1 text-sm font-medium text-text-gray-dark">
                  名前*
                </span>
                <input
                  className="w-full border-b border-background-gray-dark px-1 pb-1 text-xl placeholder:text-background-gray-dark focus:outline-none md:text-2xl"
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  {...register("name", { required: "名前は必須です" })}
                  placeholder="レミ・ニスト"
                />
              </label>
              {errors.name && (
                <div className="pt-0.5 text-xs text-text-error">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="mb-5 block">
              <label>
                <span className="block pb-1 text-sm font-medium text-text-gray-dark">
                  性別
                </span>
                <select
                  {...register("gender")}
                  className="rounded-md border border-background-gray-dark py-1 pl-2 pr-8"
                >
                  <option value="">選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </select>
              </label>
              {errors.gender && (
                <div className="text-red-500 text-xs">
                  {errors.gender.message}
                </div>
              )}
            </div>

            <div className="mb-5 block">
              <label>
                <span className="block pb-1 text-sm font-medium text-text-gray-dark">
                  関係性
                </span>
                <select
                  {...register("relationship")}
                  className="rounded-md border border-background-gray-dark py-1 pl-2 pr-8"
                >
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
                <label className="pb-1" htmlFor="birthYear">
                  誕生日
                </label>
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
              <span className="ml-1 mr-4 inline-block">年</span>
              <input
                className="w-[3em] rounded-md border border-background-gray-dark p-1 placeholder:text-background-gray-dark"
                type="number"
                autoComplete="off"
                {...register("birthMonth")}
                placeholder="11"
              />
              <span className="ml-1 mr-4 inline-block">月</span>
              <input
                className="w-[3em] rounded-md border border-background-gray-dark p-1 placeholder:text-background-gray-dark"
                type="number"
                autoComplete="off"
                {...register("birthDay")}
                placeholder="04"
              />
              <span className="ml-1 mr-4 inline-block">日</span>
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

            <div className="mt-6 max-w-sm items-center gap-5 rounded-md bg-background-gray-normal p-2 md:hidden">
              <p className="block pb-2 text-sm font-medium text-text-gray-dark">
                アイコン
              </p>
              <div className="grid grid-cols-5 gap-2">{imageSelector}</div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          {props.loading ? (
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
              <span>更新中</span>
            </div>
          ) : (
            <button
              className="w-48 rounded-md bg-primary py-3 text-white"
              type="submit"
            >
              {props.buttonText}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
