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
      className={`h-full w-full cursor-pointer rounded-2xl border-2 px-3 py-2 md:rounded-3xl md:px-6 md:py-4 ${image === props.selectedImage ? "border-primary-variant" : "border-transparent"}`}
    >
      <Image
        className="w-full"
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
        <div className="">
          <div className="mb-8 flex items-start gap-7 md:mb-14 md:gap-20">
            <Image
              className="mt-4 h-auto w-20 md:w-40"
              src={`/image/people/${props.selectedImage}.png`}
              alt="ヒトの画像"
              width={100}
              height={100}
            />
            <div className="grid grid-cols-3 gap-1 md:grid-cols-5">
              {imageSelector}
            </div>
          </div>
          <div className="rounded-2xl border border-border-white bg-white px-7 py-7 shadow shadow-shadow md:rounded-3xl md:px-16 md:py-11">
            <div className="mb-5">
              <label className="flex flex-col">
                <span className="mb-1 font-bold text-primary">名前*</span>
                <input
                  className="rounded-xl border border-border-input p-2"
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  {...register("name", { required: "名前は必須です" })}
                  placeholder="レミ・ニスト"
                />
              </label>
              {errors.name && (
                <div className="pt-0.5 text-xs text-red">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="mb-5">
              <label className="flex flex-col">
                <span className="mb-1 font-bold text-primary">性別</span>
                <select
                  {...register("gender")}
                  className="rounded-xl border border-border-input p-2"
                >
                  <option value="">選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </select>
              </label>
              {errors.gender && (
                <div className="text-xs text-red">{errors.gender.message}</div>
              )}
            </div>

            <div className="mb-5 block">
              <label className="flex flex-col">
                <span className="mb-1 font-bold text-primary">関係性</span>
                <select
                  {...register("relationship")}
                  className="rounded-xl border border-border-input p-2"
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
                <div className="text-xs text-red">
                  {errors.relationship.message}
                </div>
              )}
            </div>

            <div className="mb-5">
              <div className="mb-1">
                <label className="font-bold text-primary" htmlFor="birthYear">
                  誕生日
                </label>
              </div>
              <input
                id="birthYear"
                className="w-[4em] rounded-xl border border-border-input p-2"
                type="number"
                autoComplete="off"
                {...register("birthYear")}
                placeholder="1980"
                min="1900"
                max="2100"
              />
              <span className="ml-1 mr-4 inline-block">年</span>
              <input
                className="w-[3em] rounded-xl border border-border-input p-2"
                type="number"
                autoComplete="off"
                {...register("birthMonth")}
                placeholder="11"
              />
              <span className="ml-1 mr-4 inline-block">月</span>
              <input
                className="w-[3em] rounded-xl border border-border-input p-2"
                type="number"
                autoComplete="off"
                {...register("birthDay")}
                placeholder="04"
              />
              <span className="ml-1 mr-4 inline-block">日</span>
            </div>

            <label className="flex flex-col">
              <span className="mb-1 font-bold text-primary">出会った経緯</span>
              <textarea
                className="rounded-xl border border-border-input p-2"
                rows={3}
                {...register("encounterStory")}
              />
            </label>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          {props.loading ? (
            <div className="flex w-48 items-center justify-center rounded-full bg-primary py-3 pr-5 text-white">
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
              className="w-48 rounded-full bg-primary py-3 text-white"
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
