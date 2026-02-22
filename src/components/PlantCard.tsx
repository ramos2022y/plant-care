'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface PlantCardProps {
  id: string
  name: string
  waterDays: number
  imageUrl?: string
  hasImage?: boolean
  onWater?: () => void
  onDelete?: () => void
}

// Water Drop Icon
const WaterIcon = () => (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.5 0C5.5 0 0 4.5 0 8C0 10.76 2.24 13 5.5 13C8.76 13 11 10.76 11 8C11 4.5 5.5 0 5.5 0Z"
      fill="#3B82F6"
    />
  </svg>
)

// Placeholder Plant Icon
const PlaceholderIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 4C21 4 6 8 6 21C6 34 21 38 21 38C21 38 36 34 36 21C36 8 21 4 21 4Z"
      fill="#A8A29E"
    />
    <path d="M21 10V32" stroke="#E7E5E4" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 16C17 13 21 13 21 13" stroke="#E7E5E4" strokeWidth="2" strokeLinecap="round"/>
    <path d="M28 16C25 13 21 13 21 13" stroke="#E7E5E4" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

// Trash Icon
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14M5.333 4V2.667C5.333 2.29 5.623 2 6 2H10C10.377 2 10.667 2.29 10.667 2.667V4M12.667 4V13.333C12.667 13.71 12.377 14 12 14H4C3.623 14 3.333 13.71 3.333 13.333V4H12.667Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PlantCard: React.FC<PlantCardProps> = ({ id, name, waterDays, imageUrl, hasImage = true, onWater, onDelete }) => {
  const [isWatering, setIsWatering] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const handleWater = async () => {
    if (isWatering) return
    setIsWatering(true)
    try {
      const response = await fetch(`/api/plants/${id}/water`, { method: 'POST' })
      if (response.ok && onWater) {
        onWater()
      }
    } catch (error) {
      console.error('Error watering plant:', error)
    }
    setIsWatering(false)
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"?`)) return
    try {
      const response = await fetch(`/api/plants/${id}`, { method: 'DELETE' })
      if (response.ok && onDelete) {
        onDelete()
      }
    } catch (error) {
      console.error('Error deleting plant:', error)
    }
  }

  const getWaterText = () => {
    if (waterDays <= 0) return 'Water today!'
    if (waterDays === 1) return 'Water tomorrow'
    return `Water in ${waterDays} days`
  }

  const getWaterColor = () => {
    if (waterDays <= 0) return 'text-red-500'
    if (waterDays <= 2) return 'text-orange-500'
    return 'text-[#78716C]'
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden w-[238px] relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Delete button */}
      {showActions && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-red-50 p-2 rounded-full shadow-sm transition-colors"
          title="Delete plant"
        >
          <TrashIcon />
        </button>
      )}

      {/* Image */}
      <div className="relative h-[192px] bg-[#E7E5E4]">
        {hasImage && imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PlaceholderIcon />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="text-lg font-semibold text-[#292524] mb-1">{name}</h4>
        <div className={`flex items-center gap-1 text-sm ${getWaterColor()}`}>
          <WaterIcon />
          <span>{getWaterText()}</span>
        </div>

        {/* Water button */}
        <button
          onClick={handleWater}
          disabled={isWatering}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#3B82F6] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <WaterIcon />
          <span>{isWatering ? 'Watering...' : 'Water Now'}</span>
        </button>
      </div>
    </div>
  )
}

export default PlantCard
