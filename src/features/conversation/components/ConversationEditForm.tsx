"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { updateConversation } from "@/features/conversation/api/updateConversation";
import { ConversationType } from "@/features/conversation/types";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";

export const ConversationEditForm = (props: {
  personId: string;
  closeConversationModal: () => void;
  editingConversation: ConversationType | null;
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConversationType>({
    defaultValues: { ...props.editingConversation },
  });

  const onSubmit = async (data: ConversationType) => {
    const { accessToken, clientToken, uid } = getAuthTokensClient();
    try {
      setLoading(true);
      const conversation = await updateConversation(
        accessToken,
        clientToken,
        uid,
        {
          ...data,
        }
      );

      if (conversation) {
        setLoading(false);
        props.closeConversationModal();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border-white bg-white px-5 py-6 shadow shadow-shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="mb-2.5 font-bold"
          type="date"
          {...register("date", { required: "日付は必須です" })}
        />
        {errors.date && (
          <p className="my-1 text-xs text-text-error opacity-80">
            {errors.date.message}
          </p>
        )}
        <textarea
          className="w-full rounded-xl border border-solid border-background-gray-dark p-2"
          rows={5}
          {...register("body", { required: "本文は必須です" })}
        />
        {errors.body && (
          <p className="my-1 text-xs text-text-error opacity-80">
            {errors.body.message}
          </p>
        )}

        <div className="mt-10 flex justify-center">
          {loading ? (
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
              <span>更新</span>
            </div>
          ) : (
            <button
              className="w-48 rounded-full bg-primary py-3 text-white"
              type="submit"
            >
              更新
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
