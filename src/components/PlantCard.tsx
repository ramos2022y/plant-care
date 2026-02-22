'use client'

import React from 'react'
import Image from 'next/image'

interface PlantCardProps {
  name: string
  waterDays: number
  imageUrl?: string
  hasImage?: boolean
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

const PlantCard: React.FC<PlantCardProps> = ({ name, waterDays, imageUrl, hasImage = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[238px]">
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
        <div className="flex items-center gap-1 text-sm text-[#78716C]">
          <WaterIcon />
          <span>Water in {waterDays} days</span>
        </div>
      </div>
    </div>
  )
}

export default PlantCard
