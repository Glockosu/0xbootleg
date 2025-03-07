// components/NFTDisplayWidget.tsx
"use client"

import React from "react"

type NFTDisplayWidgetProps = {
  tokenID: string
  setTokenID: (token: string) => void
  nftImage: string
  setNftImage: (url: string) => void
}

const NFTDisplayWidget = ({
  tokenID,
  setTokenID,
  nftImage,
  setNftImage,
}: NFTDisplayWidgetProps) => {
  const fetchNFTImage = () => {
    const cid = "bafybeiefzvptnmjns6mq37wgey3hhh5hth7vznnrdrv2km6nkhvs23kthq"
    const basePath = `https://ipfs.io/ipfs/${cid}/`
    const fullPath = `${basePath}${tokenID}.png`

    console.log("Fetching NFT Image URL:", fullPath)
    setNftImage(fullPath)
  }

  // Check if the tokenID is a number between 1 and 3333
  const isValidToken =
    tokenID &&
    !isNaN(Number(tokenID)) &&
    Number(tokenID) >= 1 &&
    Number(tokenID) <= 3333

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor="nftNumber" className="text-sm">
        Input NFT Number (1 to 3333)
      </label>
      <div className="flex gap-x-2">
        <input
          id="nftNumber"
          name="nftNumber"
          type="text"
          value={tokenID}
          onChange={(e) => {
            console.log("NFT Input:", e.target.value)
            setTokenID(e.target.value)
          }}
          placeholder="Enter Number"
          className="block w-half border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-2"
        />
        <button
          onClick={fetchNFTImage}
          disabled={!isValidToken}
          className="border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150"
        >
          Load
        </button>
      </div>
      {!isValidToken && tokenID && (
        <p className="text-red-500 text-xs">
          Please enter a token number between 1 and 333.
        </p>
      )}
      {nftImage && (
        <img src={nftImage} alt="NFT Image" className="w-48 h-48 mt-4 mx-auto" />
      )}
    </div>
  )
}

export default NFTDisplayWidget
