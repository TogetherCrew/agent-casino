'use client'

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useAvailable from "@/hooks/ens/useAvailable";
import useRegisterPrice from "@/hooks/ens/useRegisterPrice";
import { formatEther } from "viem";

export default function NameInput() {
  const {
    register,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // const [price, setPrice] = useState<bigint | null>(null);

  const name = watch("name");
  const registerPrice = watch("registerPrice");
  const { data: isAvailable, isError: isAvailableError, isLoading: isAvailableLoading } = useAvailable(name);
  const { data: registerPriceData, isError: isRegisterPriceError, isLoading: isRegisterPriceLoading } = useRegisterPrice(name, 31536000);

  useEffect(() => {
    if (!name) {
      clearErrors("name");
      setValue("registerPrice", null);
      // setPrice(null);
      return;
    }

    if (name.length < 3 || name.length > 32) {
      setError("name", { type: "manual", message: "Name must be between 3 and 32 characters" });
      setValue("registerPrice", null);
      // setPrice(null);
      return;
    }

    if (isAvailableError) {
      setError("name", { type: "manual", message: "Error checking availability" });
      setValue("registerPrice", null);
    } else if (isRegisterPriceError) {
      setError("name", { type: "manual", message: "Error checking price" });
      setValue("registerPrice", null);
    } else if (isAvailable === false) {
      setError("name", { type: "manual", message: "Name is already taken" });
      setValue("registerPrice", null);
    } else {
      clearErrors("name");
      setValue("registerPrice", registerPriceData as bigint);
    }
  }, [name, isAvailable, isAvailableError, isRegisterPriceError, clearErrors, setError, registerPriceData, setValue]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input
        {...register("name")}
        className="mt-1 p-2 w-full border rounded-md"
        placeholder="Enter name"
      />
      {isAvailableLoading && <p className="text-gray-500 text-xs mt-1">Checking availability...</p>}
      {isRegisterPriceLoading && <p className="text-gray-500 text-xs mt-1">Checking price...</p>}
      {registerPrice && <p className="text-gray-500 text-xs mt-1">Registration cost: {formatEther(registerPrice as bigint)} ETH</p>}
      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
    </div>
  );
}

