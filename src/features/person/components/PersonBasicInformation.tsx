import Image from "next/image";
import Link from "next/link";

import { PersonType } from "@/features/person/types";

export const PersonBasicInformation = (props: { data: PersonType }) => {
  const today = new Date();
  let age;
  let happyBirthday = false;
  if (
    props.data.birthYear === undefined ||
    props.data.birthYear === null ||
    props.data.birthMonth === undefined ||
    props.data.birthMonth === null ||
    props.data.birthDay === undefined ||
    props.data.birthDay === null
  ) {
    age = null;
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

  console.log(props.data.birthYear, props.data.birthMonth, props.data.birthDay);

  return (
    <>
      <div className="items-start gap-14 md:flex">
        <div className="mb-4 flex justify-center px-5 py-5 md:w-1/5 md:shrink-0">
          <Image
            className="h-auto w-24 md:w-full"
            src={`/image/people/${props.data.imageUrl === null || props.data.imageUrl === undefined ? "default" : props.data.imageUrl}.png`}
            alt="ヒトの画像"
            width="144"
            height="144"
          />
        </div>
        <div className="w-full">
          <div className="relative rounded-3xl border border-border-white bg-white p-6 shadow shadow-shadow md:p-8">
            <div className="absolute right-5 top-4 flex gap-4">
              <Link
                href={`/people/${props.data.id}/edit`}
                className="rounded-lg bg-black px-5 py-0.5 text-white"
              >
                編集
              </Link>
            </div>
            <div className="mb-3 gap-4">
              <h3 className="mb-1 text-sm font-bold text-primary">性別</h3>
              <p className="pl-3 text-sm md:text-base">
                {props.data.gender ? (
                  props.data.gender
                ) : (
                  <span className="text-sm">なし</span>
                )}
              </p>
            </div>
            <div className="mb-3 gap-4">
              <h3 className="mb-1 text-sm font-bold text-primary">関係性</h3>
              <p className="pl-3 text-sm md:text-base">
                {props.data.relationship ? (
                  props.data.relationship
                ) : (
                  <span className="text-sm">なし</span>
                )}
              </p>
            </div>
            <div className="mb-3 gap-4">
              <h3 className="mb-1 text-sm font-bold text-primary">誕生日</h3>
              <div className="flex items-baseline gap-3 pl-3">
                <p className="text-sm md:text-base">
                  {props.data.birthYear ? props.data.birthYear : "----"}
                  <span className="mr-1 text-xs">年</span>
                  {props.data.birthMonth ? props.data.birthMonth : "--"}
                  <span className="mr-1 text-xs">月</span>
                  {props.data.birthDay ? props.data.birthDay : "--"}
                  <span className="text-xs">日</span>
                  {happyBirthday && <span className="ml-1">🎉</span>}
                </p>
                {age !== undefined && age !== null && age > 0 && (
                  <p className="rounded-full border border-text-gray-light px-1.5 text-xs text-text-gray-normal">
                    {age}歳
                  </p>
                )}
              </div>
            </div>
            <div className="mb-1 mt-5 gap-4">
              <h3 className="mb-1 text-sm font-bold text-primary">
                出会った経緯
              </h3>
              <p className="whitespace-pre-line pl-3 text-sm md:text-base">
                {props.data.encounterStory ? (
                  props.data.encounterStory
                ) : (
                  <span className="text-sm">なし</span>
                )}
              </p>
            </div>
            <p className="text-right text-xs text-text-gray-normal">
              作成日：{props.data.createdAt}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
