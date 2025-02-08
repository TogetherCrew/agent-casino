export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-2 px-4 text-sm font-semibold bg-gray-200 rounded-full w-fit">
      {children}
    </div>
  )
}