import { useForm } from "react-hook-form";
import { useBalance, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { formatEther, parseEther } from "viem";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";

interface DepositFormProps {
  targetWallet: `0x${string}`;
  onSuccess?: () => void;
}

interface FormValues {
  amount: string;
}

export const DepositForm = ({ targetWallet, onSuccess }: DepositFormProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [hash, setHash] = useState<`0x${string}` | null>(null);

  const { address } = useAppKitAccount();
  const { data: balance } = useBalance({
    address: address as `0x${string}`
  });
  const { sendTransactionAsync } = useSendTransaction();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: hash as `0x${string}` });

  const onSubmit = async (data: FormValues) => {
    console.log(`amount: ${data.amount}`)
    console.log(`parseEther: ${parseEther(data.amount)}`)
    console.log(`balance: ${balance?.value}`)
    try {
      const hash = await sendTransactionAsync({
        to: targetWallet,
        value: parseEther(data.amount),
      });
      setHash(hash as `0x${string}`);
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
        {isLoading ? "Depositing..." : "Deposit"}
      </button>
    </form >
  );
};
