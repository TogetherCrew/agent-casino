import { Button, Dialog, DialogPanel } from '@headlessui/react'
import { useEffect, useState } from 'react'

export default function Modal({ buttonText, children, toggle }: { buttonText: string, children: React.ReactNode, toggle: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (toggle) {
      setIsOpen(toggle)
    }
  }, [toggle])

  return (
    <>
      <Button
        onClick={open}
        className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80 hover:cursor-pointer w-full"
      >
        {buttonText}
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-xs">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
