"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { updatePerson } from "@/features/person/api/updatePerson";
import { PersonForm } from "@/features/person/components/PersonForm";
import { PersonType } from "@/features/person/types";

export const PersonEdit = (props: { id: string; data: PersonType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(props.data.imageUrl);

  const defaultValues = props.data;

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };

  const onSubmit: SubmitHandler<PersonType> = async (data: PersonType) => {
    try {
      setLoading(true);
      const person = await updatePerson(props.id, {
        ...data,
        imageUrl: selectedImage,
      });
      if (person) {
        router.push(`/people/${person.data.person.id}`);
        router.refresh();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <PersonForm
        selectedImage={selectedImage}
        loading={loading}
        handleSelectImage={handleSelectImage}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        buttonText="更新"
      />
    </>
  );
};
