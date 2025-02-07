'use client'

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import NameInput from "./NameInput";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(32, "Name must be at most 32 characters"),
});

export default function CreateAgentForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: unknown) => {
    const other: z.infer<typeof schema> = data as z.infer<typeof schema>
    alert(`Submitting: ${other.name}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <NameInput />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
