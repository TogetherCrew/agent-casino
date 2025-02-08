import { DialogTitle } from "@headlessui/react";
import Modal from "../Modal";
import { useState } from "react";
import { CardHeader } from "../card/CardHeader";
import { WithdrawlForm } from "../WithdrawlForm";

export default function WithdrawlModal({ agentId, agentAddress }: { agentId: number, agentAddress: `0x${string}` }) {
  const [toggle, setToggle] = useState(false);
  return (
    <Modal buttonText="Withdraw" toggle={toggle}>
      <div className="flex flex-col gap-4">
        <DialogTitle as="h3">
          <CardHeader>Withdraw</CardHeader>
        </DialogTitle>
        <WithdrawlForm agentId={agentId} agentWallet={agentAddress} onSuccess={() => setToggle(false)} />
      </div>
    </Modal>
  )
}