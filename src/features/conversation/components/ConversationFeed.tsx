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
      <h2 className="mb-3 pl-5 text-lg font-bold">最近の会話</h2>
      <ul className="flex flex-col gap-4">
        {feed.map((item) => {
          return (
            <li
              key={item.id}
              className="rounded-3xl border border-border-white bg-white px-5 py-6 shadow shadow-shadow"
            >
              <p className="mb-2.5 font-bold">{item.date}</p>
              <p className="whitespace-pre-line">{item.body}</p>
              <div className="flex justify-end">
                <Link
                  className="mt-2.5 text-primary"
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
