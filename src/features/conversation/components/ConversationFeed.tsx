"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getFeed } from "@/features/conversation/api/getFeed";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";

interface FeedType {
  id: number;
  personId: number;
  personName: string;
  date: string;
  body: string;
}

export const ConversationFeed = () => {
  const [feed, setFeed] = useState<FeedType[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const { accessToken, clientToken, uid } = getAuthTokensClient();
      try {
        const data = await getFeed(accessToken, clientToken, uid);
        setFeed(data);
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div>
      <h2 className="mb-3 pl-4 text-lg font-bold md:pl-5">最近の会話</h2>
      <ul className="flex flex-col gap-2.5 md:gap-4">
        {feed.map((item) => {
          return (
            <li
              key={item.id}
              className="rounded-2xl border border-border-white bg-white px-4 py-4 shadow shadow-shadow md:rounded-3xl md:px-5 md:py-6"
            >
              <p className="mb-1.5 text-sm font-bold md:mb-2.5 md:text-base">
                {item.date}
              </p>
              <p className="whitespace-pre-line text-sm md:text-base">
                {item.body}
              </p>
              <div className="flex justify-end">
                <Link
                  className="mt-1.5 text-sm text-primary md:mt-2.5 md:text-base"
                  href={`/people/${item.personId}`}
                >
                  {item.personName}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
