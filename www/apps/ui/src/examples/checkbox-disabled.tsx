import { Checkbox, Label } from "@vikrai/ui"

export default function CheckboxDisabled() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="billing-shipping-disabled" disabled={true} />
      <Label htmlFor="billing-shipping-disabled">
        Billing address same as shipping address
      </Label>
    </div>
  )
}

