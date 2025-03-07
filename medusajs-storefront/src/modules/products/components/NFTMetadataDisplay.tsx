// components/NFTMetadataDisplay.tsx
import React from "react"
import { Text } from "@medusajs/ui"

type NFTMetadataDisplayProps = {
  metadata: Record<string, any>
}

const NFTMetadataDisplay = ({ metadata }: NFTMetadataDisplayProps) => {
  // If there's no nft_token, don't display anything
  if (!metadata?.nft_token) return null

  return (
    <div className="mt-2">
      <Text className="text-sm text-ui-fg-muted">
        NFT Token: {String(metadata.nft_token)}
      </Text>
    </div>
  )
}

export default NFTMetadataDisplay
