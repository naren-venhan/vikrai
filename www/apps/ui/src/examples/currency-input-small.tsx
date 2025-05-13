import { CurrencyInput } from "@vikrai/ui"

export default function CurrencyInputSmall() {
  return (
    <div className="max-w-[250px]">
      <CurrencyInput size="small" symbol="$" code="usd" />
    </div>
  )
}

