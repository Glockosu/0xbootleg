// components/LineItemOptions.tsx
import { ProductVariant } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = { 
  variant: ProductVariant 
  metadata?: Record<string, any>
}

const LineItemOptions = ({ variant, metadata }: LineItemOptionsProps) => {
  return (
    <Text className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis">
      Variant: {variant.title}
      {metadata?.nft_token && (
        <> | NFT Token: {String(metadata.nft_token)}</>
      )}
      {metadata?.custom_text && (
        <> | Custom Text: {String(metadata.custom_text)}</>
      )}
    </Text>
  )
}

export default LineItemOptions

