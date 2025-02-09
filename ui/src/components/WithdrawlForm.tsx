import { useForm } from "react-hook-form";
import { useBalance, useSignTypedData } from "wagmi";
import { formatEther, parseEther } from "viem";
import { useEffect } from "react";
import { useAppKitNetwork } from "@reown/appkit/react";


interface WithdrawTypedData {
  domain: {
    name: string
    version: string
    chainId?: number
    verifyingContract?: `0x${string}`
  }
  types: {
    Withdraw: { name: string; type: string }[]
  }
  primaryType: 'Withdraw'
  message: {
    agentId: number
    amount: bigint
    expireAt: number
  }
}

interface WithdrawlFormProps {
  agentId: number;
  agentWallet: `0x${string}`;
  onSuccess?: () => void;
}

interface FormValues {
  amount: string;
}

export const WithdrawlForm = ({ agentId, agentWallet, onSuccess }: WithdrawlFormProps) => {

  const isLoading = false
  const isSuccess = false

  const { chainId } = useAppKitNetwork();

  const { signTypedDataAsync } = useSignTypedData()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { data: balance } = useBalance({
    address: agentWallet as `0x${string}`
  });

  const onSubmit = async (data: FormValues) => {
    try {

      const types = {
        Withdraw: [
          { name: "amount", type: "uint256" },
          { name: "agentId", type: "uint256" },
          { name: "expireAt", type: "uint256" },
        ]
      }

      const domain = {
        name: "agent-casino",
        version: "1",
      }

      const message = {
        amount: parseEther(data.amount),
        agentId: agentId,
        expireAt: new Date().getTime() + 5 * 60 * 1000, // 5 minutes
      }

      const typedData: WithdrawTypedData = {
        domain,
        types,
        primaryType: 'Withdraw',
        message
      }

      const signature = await signTypedDataAsync({
        types,
        domain,
        message,
        primaryType: "Withdraw",
      })

      const body = JSON.stringify({ signature, message: typedData }, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )

      const response = await fetch(`https://onchain.togethercrew.de/api/v1/mpc-wallet/${chainId}/${agentId}/withdraw`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      const json = await response.json()
      console.log(`json`, json)
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.();
    }
  }, [isSuccess, onSuccess]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Amount (ETH)
          </label>
          <div className="text-xs font-medium text-gray-700 mb-1">Balance: {formatEther(balance?.value || BigInt(0)).slice(0, 6)}</div>
        </div>
        <input
          type="number"
          step="any"
          {...register("amount", {
            required: "Amount is required",
            min: {
              value: 0,
              message: "Amount must be greater than 0",
            },
            max: {
              value: Number(formatEther(balance?.value || BigInt(0))),
              message: "Amount exceeds wallet balance",
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80 hover:cursor-pointer w-full"
        disabled={isLoading}
      >
        {isLoading ? "Withdrawing..." : "Withdraw"}
      </button>
    </form >
  );
};
