"use client";

import { useEffect, useState } from "react";

import { deleteConversation } from "@/features/conversation/api/deleteConversation";
import { getConversation } from "@/features/conversation/api/getConversation";
import { getConversationsList } from "@/features/conversation/api/getConversationsList";
import { ConversationAddForm } from "@/features/conversation/components/ConversationAddForm";
import { ConversationEditForm } from "@/features/conversation/components/ConversationEditForm";
import { ConversationType } from "@/features/conversation/types";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";
import refetchForServer from "@/libs/api/refetchForServer";

export const ConversationsList = (props: {
  conversations: ConversationType[];
  personId: string;
}) => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingConversation, setEditingConversation] =
    useState<ConversationType | null>(null);
  const [conversations, setConversations] = useState<ConversationType[]>(
    props.conversations
  );

  useEffect(() => {
    const fetchConversations = async () => {
      const { accessToken, clientToken, uid } = getAuthTokensClient();
      try {
        const data = await getConversationsList(
          accessToken,
          clientToken,
          uid,
          props.personId
        );
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, [props.personId, isCreateFormOpen, isEditFormOpen]);

  const openConversationModal = () => {
    setIsCreateFormOpen(true);
  };
  const closeConversationModal = () => {
    setIsCreateFormOpen(false);
  };

  const openEditConversationModal = (conversationId: number) => {
    setIsEditFormOpen(true);

    async function fetchConversation() {
      const { accessToken, clientToken, uid } = getAuthTokensClient();
      try {
        const data = await getConversation(
          accessToken,
          clientToken,
          uid,
          props.personId,
          conversationId.toString()
        );
        setEditingConversation(data);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    }

    fetchConversation();
  };

  const closeEditConversationModal = () => {
    setIsEditFormOpen(false);
    setEditingConversation(null);
  };

  const handleDeleteConversation = (conversationId: number) => {
    const { accessToken, clientToken, uid } = getAuthTokensClient();
    try {
      deleteConversation(
        accessToken,
        clientToken,
        uid,
        props.personId,
        conversationId.toString()
      );
      setConversations(
        conversations.filter(
          (conversation) => conversation.id !== conversationId
        )
      );
      refetchForServer("/people/" + props.personId + "/conversations");
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  return (
    <>
      <div className="mb-8">
        <button
          className="w-full rounded-lg border-2 border-dashed border-background-gray-dark py-8 text-lg text-text-gray-light"
          onClick={openConversationModal}
        >
          会話を追加する
        </button>
      </div>
      {isCreateFormOpen && (
        <>
          <div
            onClick={closeConversationModal}
            className="fixed left-0 top-0 z-10 h-full w-full bg-background-black opacity-30"
          ></div>
          <ConversationAddForm
            personId={props.personId}
            closeConversationModal={closeConversationModal}
          />
        </>
      )}
      {conversations.length === 0 ? (
        <p className="pt-10 text-center font-medium text-text-gray-dark">
          まだ会話はありません
        </p>
      ) : (
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className="mb-6 rounded-lg border border-background-gray-dark bg-white p-6 pb-7 text-text-dark-blue"
            >
              <div className="mb-4 flex justify-between text-sm">
                <p className="font-medium text-text-gray-dark">
                  {conversation.date}
                </p>
                <div className="flex gap-6 text-text-gray-light">
                  <button
                    className="transition-colors hover:text-text-gray-dark"
                    onClick={() => openEditConversationModal(conversation.id)}
                  >
                    編集
                  </button>
                  <button
                    className="transition-colors hover:text-text-gray-dark"
                    onClick={() => handleDeleteConversation(conversation.id)}
                  >
                    削除
                  </button>
                </div>
              </div>
              <p className="whitespace-pre-line border-t border-background-gray-dark pt-4">
                {conversation.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      {isEditFormOpen && editingConversation && (
        <>
          <div
            onClick={closeEditConversationModal}
            className="fixed left-0 top-0 z-10 h-full w-full bg-background-black opacity-30"
          ></div>
          <ConversationEditForm
            personId={props.personId}
            closeConversationModal={closeEditConversationModal}
            editingConversation={editingConversation}
          />
        </>
      )}
    </>
  );
};
