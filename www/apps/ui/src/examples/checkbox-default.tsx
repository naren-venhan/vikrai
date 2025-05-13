import { Checkbox, Label } from "@vikrai/ui"

export default function CheckboxDefault() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="billing-shipping-default" />
      <Label htmlFor="billing-shipping-default">
        Billing address same as shipping address
      </Label>
    </div>
  )
}

