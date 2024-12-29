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
      <h2 className="mb-6 text-center text-lg font-medium text-text-gray-dark">
        最近の会話
      </h2>
      <ul className="flex flex-col gap-4">
        {feed.map((item) => {
          return (
            <li
              key={item.id}
              className="mb-6 rounded-lg border border-background-gray-dark bg-white p-6 pb-7 text-text-dark-blue"
            >
              <p className="mb-4 text-sm font-medium text-text-gray-dark">
                {item.date}
              </p>
              <p className="whitespace-pre-line border-t border-background-gray-dark pt-4">
                {item.body}
              </p>
              <div className="flex justify-end">
                <Link
                  className="mt-2 text-right text-primary"
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
