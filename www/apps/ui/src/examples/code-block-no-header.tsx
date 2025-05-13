import { CodeBlock } from "@vikrai/ui"

const snippets = [
  {
    label: "vikrai JS SDK",
    language: "jsx",
    code: `// Install the JS SDK in your storefront project: @vikrai/js-sdk\n\nimport vikrai from "@vikrai/js-sdk"\n\nconst vikrai = new vikrai({\n  baseUrl: import.meta.env.NEXT_PUBLIC_BACKEND_URL || "/",\n  publishableKey: process.env.NEXT_PUBLIC_vikrai_PAK\n})\nconst { product } = await vikrai.store.products.retrieve("prod_123")\nconsole.log(product.id)`,
  },
]

export default function CodeBlockNoHeader() {
  return (
    <div className="w-full">
      <CodeBlock snippets={snippets}>
        <CodeBlock.Body />
      </CodeBlock>
    </div>
  )
}

