import Image from "next/image";
import Link from "next/link";

import { PersonType } from "@/features/person/types";

export const PersonBasicInformation = (props: { data: PersonType }) => {
  const today = new Date();
  let age;
  let happyBirthday = false;
  if (
    props.data.birthYear === undefined ||
    props.data.birthMonth === undefined ||
    props.data.birthDay === undefined
  ) {
    age = undefined;
  } else {
    const birthday = new Date(
      props.data.birthYear,
      props.data.birthMonth - 1,
      props.data.birthDay
    );
    if (today < birthday) {
      age = undefined;
    } else {
      age =
        today.getFullYear() -
        birthday.getFullYear() -
        (today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
          today.getDate() < birthday.getDate())
          ? 1
          : 0);

      if (
        today.getMonth() === birthday.getMonth() &&
        today.getDate() === birthday.getDate()
      ) {
        happyBirthday = true;
      }
    }
  }

  return (
    <>
      <p className="mb-3 text-right text-xs text-text-gray-light md:mb-6">
        作成日：{props.data.createdAt}
      </p>
      <div className="flex">
        <Link
          href={`/people/${props.data.id}/edit`}
          className="border-text-gray-normal mb-4 ml-auto border bg-background-gray-dark px-3 text-sm text-text-gray-dark md:hidden"
        >
          編集
        </Link>
      </div>
      <div className="items-start gap-14 md:flex">
        <div className="mb-4 flex justify-center md:w-1/5 md:shrink-0">
          <Image
            className="h-auto w-24 md:w-full"
            src={`/image/people/${props.data.imageUrl === null || props.data.imageUrl === undefined ? "default" : props.data.imageUrl}.png`}
            alt="ヒトの画像"
            width="144"
            height="144"
          />
        </div>
        <div className="w-full">
          <div className="mb-6 flex flex-row items-start justify-between gap-2 px-2 md:mb-8">
            <h1 className="w-full text-center text-xl font-medium text-text-dark-blue md:text-left md:text-2xl">
              {props.data.name}
            </h1>
            <Link
              href={`/people/${props.data.id}/edit`}
              className="border-text-gray-normal ml-auto hidden shrink-0 border bg-background-gray-dark px-3 text-sm text-text-gray-dark md:block"
            >
              編集
            </Link>
          </div>
          <div className="rounded-md bg-background-gray-normal p-6 shadow-sm md:p-8">
            <div className="mb-3 md:flex md:gap-10">
              <div className="mb-3 flex items-center gap-4 md:mb-0">
                <h3 className="text-sm font-semibold text-text-gray-light">
                  性別
                </h3>
                <p className="text-sm md:text-base">
                  {props.data.gender ? (
                    props.data.gender
                  ) : (
                    <span className="text-sm">なし</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-semibold text-text-gray-light">
                  関係性
                </h3>
                <p className="text-sm md:text-base">
                  {props.data.relationship ? (
                    props.data.relationship
                  ) : (
                    <span className="text-sm">なし</span>
                  )}
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-center gap-4">
              <h3 className="text-sm font-semibold text-text-gray-light">
                誕生日
              </h3>
              <p className="text-sm md:text-base">
                {props.data.birthYear ? props.data.birthYear : "----"}
                <span className="mr-1 text-xs">年</span>
                {props.data.birthMonth ? props.data.birthMonth : "--"}
                <span className="mr-1 text-xs">月</span>
                {props.data.birthDay ? props.data.birthDay : "--"}
                <span className="text-xs">日</span>
                {happyBirthday && <span className="ml-1">🎉</span>}
              </p>
              {age !== undefined && (
                <p className="rounded-full border border-text-gray-light px-1.5 text-xs text-text-gray-light">
                  {age}歳
                </p>
              )}
            </div>
            <div className="mb-1 mt-5 gap-4 border-t border-dashed border-background-gray-dark pt-4">
              <h3 className="mb-1 text-sm font-semibold text-text-gray-light">
                出会った経緯
              </h3>
              <p className="whitespace-pre-line text-sm md:text-base">
                {props.data.encounterStory ? (
                  props.data.encounterStory
                ) : (
                  <span className="text-sm">なし</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
