import { DialogTitle } from "@headlessui/react";
import Modal from "../Modal";
import { DepositForm } from "../DepositForm";
import { useState } from "react";
import { CardHeader } from "../card/CardHeader";

export default function Deposit({ targetWallet }: { targetWallet: `0x${string}` }) {
  const [toggle, setToggle] = useState(false);
  return (
    <Modal buttonText="Deposit" toggle={toggle}>
      <div className="flex flex-col gap-4">
        <DialogTitle as="h3">
          <CardHeader>Deposit</CardHeader>
        </DialogTitle>
        <DepositForm targetWallet={targetWallet} onSuccess={() => setToggle(false)} />
      </div>
    </Modal>
  )
}