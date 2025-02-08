import { useForm } from "react-hook-form";
import { useBalance, useSignMessage, useSignTypedData } from "wagmi";
import { formatEther, parseEther } from "viem";

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
        ]
      }

      const domain = {
        name: "agent-casino",
        version: "1",
      }

      const message = {
        amount: parseEther(data.amount),
        agentId: agentId,
      }

      const signature = await signTypedDataAsync({
        types,
        domain,
        message,
        primaryType: "Withdraw",
      })

      // TODO: send signature + message to backend
      console.log(`signature: ${signature}`)
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     onSuccess?.();
  //   }
  // }, [isSuccess, onSuccess]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Amount (ETH)
          </label>
          <div className="text-xs font-medium text-gray-700 mb-1">Balance: {formatEther(balance?.value || 0n).slice(0, 6)}</div>
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
              value: Number(formatEther(balance?.value || 0n)),
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
