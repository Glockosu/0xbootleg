"use client"

import { useEffect, useState } from "react"
import { medusaClient } from "@lib/config"

type Collection = {
  id: string
  title: string
}

const CollectionsList = () => {
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { collections } = await medusaClient.collections.list()
        setCollections(collections)
      } catch (error) {
        console.error("Error fetching collections:", error)
      }
    }

    fetchCollections()
  }, [])

  if (collections.length === 0) {
    return (
      <div className="collections-list">
        <h3 className="text-lg font-semibold mb-4">Collections</h3>
        <p>No collections available.</p>
      </div>
    )
  }

  return (
    <div className="collections-list">
      <h3 className="text-sm text-gray-400 mb-4">Collections</h3>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id} className="mb-2">
            {/* You can make the collection titles clickable links if needed */}
            <a href={`/collections/${collection.title}`} className="text-sm text-blue-500 hover:underline">
              {collection.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CollectionsList
