"use client"

import React, { useState } from "react"

type RemiliaSmileyWidgetProps = {
  customText: string
  setCustomText: (text: string) => void
}

const RemiliaSmileyWidget = ({
  customText,
  setCustomText,
}: RemiliaSmileyWidgetProps) => {
  const [error, setError] = useState("")
  const [applied, setApplied] = useState(false)

  const handleApplyText = () => {
    const trimmed = customText.trim()
    if (!trimmed) {
      setError("Please enter some text.")
      setApplied(false)
      return
    }
    if (trimmed.length > 100) {
      setError("Text cannot exceed 100 characters.")
      setApplied(false)
      return
    }
    setError("")
    setApplied(true)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor="customText" className="text-sm">
        Enter Custom Text (max 100 characters)
      </label>
      <div className="flex gap-x-2">
        <input
          id="customText"
          name="customText"
          type="text"
          value={customText}
          onChange={(e) => {
            setCustomText(e.target.value)
            setApplied(false)
          }}
          placeholder="Enter your text"
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-2"
        />
        <button
          onClick={handleApplyText}
          className="border border-gray-300 text-sm h-10 rounded-md p-2 flex-1 hover:shadow-lg transition-shadow duration-150"
        >
          Apply
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs">
          {error}
        </p>
      )}
      {applied && (
        <p className="text-green-500 text-xs">
          Text applied: {customText}
        </p>
      )}
    </div>
  )
}

export default RemiliaSmileyWidget
