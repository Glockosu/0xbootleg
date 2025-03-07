// src/modules/products/components/product-actions/index.tsx
"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"
import MobileActions from "../mobile-actions"
import ProductPrice from "../product-price"
import NFTDisplayWidget from "../nft-options"
import RemiliaSmileyWidget from "../remiliasmiley-options/RemiliaSmileyWidget"

export type PriceType = {
  calculated_price: string
  original_price?: string
  price_type?: "sale" | "default"
  percentage_diff?: string
}

type ProductActionsProps = {
  product: PricedProduct
  region: Region
}

export default function ProductActions({ product, region }: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)

  // --- NFT state ---
  const [tokenID, setTokenID] = useState("")
  const [nftImage, setNftImage] = useState("")

  const countryCode = useParams().countryCode as string
  const variants = product.variants

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }

    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}
      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }
      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (variant && !variant.inventory_quantity) {
      return false
    }

    if (variant && variant.allow_backorder === false) {
      return true
    }
  }, [variant])

  // Validate NFT token if applicable
  const isValidNft =
    product.handle !== "sg1of1" ||
    (tokenID &&
      !isNaN(Number(tokenID)) &&
      Number(tokenID) >= 1 &&
      Number(tokenID) <= 333)

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")
  const [customText, setCustomText] = useState("")

  const isValidCustomText =
    product.handle !== "remiliasmiley" ||
    (customText && customText.trim().length > 0 && customText.trim().length <= 100)

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (product.handle === "remiliasmiley" && !isValidCustomText) {
      alert("Please enter valid custom text (1-100 characters) for this product.")
      return
    }
    if (product.handle === "sg1of1" && (!tokenID || !isValidNft)) {
      alert("Please enter a valid NFT token number between 1 and 333.")
      return
    }
    if (!variant?.id) return null
  
    // Log token and metadata for debugging
    const extraMetadata =
      product.handle === "remiliasmiley"
        ? { custom_text: customText }
        : product.handle === "sg1of1"
        ? { nft_token: tokenID }
        : {}
    console.log("Adding to cart with metadata:", extraMetadata)
  
    setIsAdding(true)
    await addToCart({
      variantId: variant.id,
      quantity: 1,
      countryCode,
      metadata: extraMetadata,
    } as any)
    setIsAdding(false)
  }
  

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        {/* Existing options and variant selection */}
        <div>
          {product.variants.length > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={updateOptions}
                    title={option.title}
                  />
                </div>
              ))}
              <Divider />
            </div>
          )}
        </div>

        {/* Conditionally render the custom text widget for remiliasmiley */}
        {product.handle === "remiliasmiley" && (
          <RemiliaSmileyWidget
            customText={customText}
            setCustomText={setCustomText}
          />
        )}

        {/* Render NFT widget only for the specific product */}
        {product.handle === "sg1of1" && (
          <NFTDisplayWidget
            tokenID={tokenID}
            setTokenID={setTokenID}
            nftImage={nftImage}
            setNftImage={setNftImage}
          />
        )}

        <ProductPrice product={product} variant={variant} region={region} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !variant ||
            (product.handle === "remiliasmiley" && !isValidCustomText) ||
            (product.handle === "sg1of1" && /* nft validation check */ false)
          }
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
        >
          {!variant
            ? "Select variant"
            : !inStock
            ? "Out of stock"
            : "Add to cart"}
        </Button>
        <MobileActions
          product={product}
          variant={variant}
          region={region}
          options={options}
          updateOptions={updateOptions}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
        />
      </div>
    </>
  )
}
