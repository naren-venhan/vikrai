import { Button, Toaster, toast } from "@vikrai/ui"

export default function ToasterError() {
  return (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast.error("Error", {
            description: "The quick brown fox jumps over the lazy dog.",
            duration: 5000,
          })
        }
      >
        Show
      </Button>
    </>
  )
}

