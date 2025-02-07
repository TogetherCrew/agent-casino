'use client'

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import NameInput from "./NameInput";
import BioTextarea from "./BioTextarea";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(32, "Name must be at most 32 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(1100, "Bio must be at most 1000 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function CreateAgentForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    alert(`Submitting: ${data.name}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <NameInput />
        <BioTextarea />
        <button type="submit" className="hover:cursor-pointer px-4 py-2 bg-black text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={!methods.formState.isValid} >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
