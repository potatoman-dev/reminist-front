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
      <div className="mb-3 flex items-baseline">
        <h2 className="pl-5 text-2xl font-bold">会話</h2>
        <button
          className="ml-auto mr-5 rounded-full bg-primary px-10 py-3 text-white"
          onClick={openConversationModal}
        >
          会話を追加
        </button>
      </div>
      {isCreateFormOpen && (
        <ConversationAddForm
          personId={props.personId}
          closeConversationModal={closeConversationModal}
        />
      )}
      {conversations.length === 0 ? (
        <p className="pt-10 text-center font-medium text-text-gray-dark">
          まだ会話はありません
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              {isEditFormOpen && editingConversation?.id === conversation.id ? (
                <>
                  <ConversationEditForm
                    personId={props.personId}
                    closeConversationModal={closeEditConversationModal}
                    editingConversation={editingConversation}
                  />
                </>
              ) : (
                <div className="rounded-3xl border border-border-white bg-white px-5 py-6 shadow shadow-shadow">
                  <p className="mb-2.5 font-bold">{conversation.date}</p>
                  <p className="whitespace-pre-line">{conversation.body}</p>
                  <div className="mt-2.5 flex justify-end gap-4">
                    <button
                      className="text-primary"
                      onClick={() => openEditConversationModal(conversation.id)}
                    >
                      編集
                    </button>
                    <button
                      className="text-red"
                      onClick={() => handleDeleteConversation(conversation.id)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
