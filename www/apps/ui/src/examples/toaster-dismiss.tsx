import { Button, Toaster, toast } from "@vikrai/ui"

export default function DismissableToaster() {
  return (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast.info("Info", {
            description: "The quick brown fox jumps over the lazy dog.",
            dismissable: true,
          })
        }
      >
        Show
      </Button>
    </>
  )
}

