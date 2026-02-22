'use client'

import { useState } from 'react'

interface AddPlantModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

// Close Icon
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const AddPlantModal: React.FC<AddPlantModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('')
  const [sunlight, setSunlight] = useState('Bright, indirect')
  const [wateringDays, setWateringDays] = useState(7)
  const [fertilizingWeeks, setFertilizingWeeks] = useState(4)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Plant name is required')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          sunlight_requirement: sunlight,
          watering_interval_days: wateringDays,
          fertilization_interval_weeks: fertilizingWeeks,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add plant')
      }

      setName('')
      setSunlight('Bright, indirect')
      setWateringDays(7)
      setFertilizingWeeks(4)
      onAdd()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E7E5E4]">
          <h2 className="text-lg font-semibold text-[#292524]">Add New Plant</h2>
          <button
            onClick={onClose}
            className="text-[#78716C] hover:text-[#292524] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#44403C] mb-1">
              Plant Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Fiddle Leaf Fig"
              className="w-full px-4 py-2.5 border border-[#E7E5E4] rounded-lg bg-white text-[#292524] placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>

          {/* Sunlight */}
          <div>
            <label className="block text-sm font-medium text-[#44403C] mb-1">
              Sunlight Requirement
            </label>
            <select
              value={sunlight}
              onChange={(e) => setSunlight(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#E7E5E4] rounded-lg bg-white text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            >
              <option value="Low light">Low light</option>
              <option value="Low to bright, indirect">Low to bright, indirect</option>
              <option value="Bright, indirect">Bright, indirect</option>
              <option value="Bright, direct">Bright, direct</option>
              <option value="Full sun">Full sun</option>
            </select>
          </div>

          {/* Watering interval */}
          <div>
            <label className="block text-sm font-medium text-[#44403C] mb-1">
              Water every (days)
            </label>
            <input
              type="number"
              min={1}
              max={60}
              value={wateringDays}
              onChange={(e) => setWateringDays(parseInt(e.target.value) || 7)}
              className="w-full px-4 py-2.5 border border-[#E7E5E4] rounded-lg bg-white text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>

          {/* Fertilizing interval */}
          <div>
            <label className="block text-sm font-medium text-[#44403C] mb-1">
              Fertilize every (weeks)
            </label>
            <input
              type="number"
              min={1}
              max={52}
              value={fertilizingWeeks}
              onChange={(e) => setFertilizingWeeks(parseInt(e.target.value) || 4)}
              className="w-full px-4 py-2.5 border border-[#E7E5E4] rounded-lg bg-white text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-[#E7E5E4] rounded-lg text-[#57534E] hover:bg-[#FAFAF9] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#22C55E] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#16A34A] transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Plant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPlantModal
