'use client'

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import NameInput from "./NameInput";
import BioTextarea from "./BioTextarea";
import { useAppKitNetwork } from "@reown/appkit/react";
import { agentFactory } from "@/contracts";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(32, "Name must be at most 32 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(1100, "Bio must be at most 1000 characters"),
  registerPrice: z.bigint(),
});

type FormValues = z.infer<typeof schema>;

export default function CreateAgentForm() {
  const { chainId } = useAppKitNetwork();
  const [hash, setHash] = useState<`0x${string}` | null>(null);
  const { writeContractAsync } = useWriteContract();
  const { isPending, isSuccess } = useWaitForTransactionReceipt({ hash: hash as `0x${string}` });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const hash = await writeContractAsync({
      abi: agentFactory.abi,
      address: agentFactory.contractAddress[chainId as number],
      functionName: 'createAgent',
      args: [data.name, data.bio, "agent"],
      value: data.registerPrice as bigint
    });
    setHash(hash);
    setIsSubmitting(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <NameInput />
        <BioTextarea />
        <button type="submit" className="hover:cursor-pointer px-4 py-2 bg-black text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={!methods.formState.isValid || (hash && isPending) || (hash && isSuccess) || isSubmitting} >
          {!hash && !isSubmitting && <span>Submit</span>}
          {hash && isPending && <span className="ml-2">Pending...</span>}
          {hash && isSuccess && <span className="ml-2">Success!</span>}
          {isSubmitting && <span className="ml-2">Submitting...</span>}
        </button>
      </form>
    </FormProvider>
  );
}
