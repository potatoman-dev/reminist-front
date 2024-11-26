"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createPerson } from "@/features/person/api/createPerson";
import { PersonForm } from "@/features/person/components/PersonForm";
import { PersonType } from "@/features/person/types";

export const PersonCreate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("default");

  const defaultValues = {
    name: "",
    birthYear: undefined,
    birthMonth: undefined,
    birthDay: undefined,
    gender: undefined,
    relationship: undefined,
    encounterStory: undefined,
    imageUrl: "default",
  };

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };

  const onSubmit = async (data: PersonType) => {
    try {
      setLoading(true);
      const person = await createPerson({ ...data, imageUrl: selectedImage });
      if (person) {
        router.push(`/people/${person.data.person.id}`);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <PersonForm
        handleSelectImage={handleSelectImage}
        loading={loading}
        selectedImage={selectedImage}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        buttonText="作成"
      />
    </>
  );
};
