"use client"
import React, { useState } from 'react'; /* @client */
import axios from 'axios';


const NFTDisplayWidget = () => {
  const [tokenID, setTokenID] = useState('');
  const [nftImage, setNftImage] = useState('');

  const fetchNFTImage = () => {
    const cid = "bafybeiefzvptnmjns6mq37wgey3hhh5hth7vznnrdrv2km6nkhvs23kthq"; // Your collection's CID
    const basePath = `https://ipfs.io/ipfs/${cid}/`; 
    const fullPath = `${basePath}${tokenID}.png`; // Assuming the image is always in .png format
  
    setNftImage(fullPath); // Directly set the URL as the source for the image element
  };

  return (
    <div>
        <input
            type="text"
            value={tokenID}
            onChange={(e) => setTokenID(e.target.value)}
            placeholder="Enter the number of the NFT image"
        />
        <button onClick={fetchNFTImage}>Load NFT</button>
        {nftImage && (
            <img src={nftImage} alt="NFT Image" style={{ width: '200px', height: '200px', display: 'block', marginTop: '20px' }} />
        )}
    </div>
  );
};

export default NFTDisplayWidget;

