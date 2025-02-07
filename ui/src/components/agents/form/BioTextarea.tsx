'use client'

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function BioTextarea() {
  const {
    register,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const bio = watch("bio");

  useEffect(() => {
    if (!bio || bio.length >= 10 && bio.length <= 1100) {
      clearErrors("bio");
      return;
    }

    if (bio.length < 10 || bio.length > 1100) {
      setError("bio", { type: "manual", message: "Bio must be between 10 and 1100 characters" });
      return;
    }
  }, [bio, clearErrors, setError]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Bio</label>
      <textarea
        {...register("bio")}
        className="mt-1 p-2 w-full border rounded-md h-48"
        placeholder="Enter bio"
      />
      {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message as string}</p>}
    </div>
  );
}
