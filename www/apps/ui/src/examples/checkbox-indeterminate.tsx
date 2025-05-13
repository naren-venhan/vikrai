import { Checkbox, Label } from "@vikrai/ui"

export default function CheckboxIndeterminate() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="billing-shipping-indeterminate" checked={"indeterminate"} />
      <Label htmlFor="billing-shipping-indeterminate">
        Billing address same as shipping address
      </Label>
    </div>
  )
}

