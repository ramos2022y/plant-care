'use client'

import { useEffect, useState } from 'react'
import { Header, PlantCard, TasksTable, AddPlantModal } from '@/components'

interface Plant {
  id: string
  name: string
  image_url: string | null
  sunlight_requirement: string
  watering_interval_days: number
  fertilization_interval_weeks: number
  last_watered_at: string
  last_fertilized_at: string
  waterDays: number
  fertilizeDays: number
  watering: string
  fertilization: string
}

// Leaf Icon for "All Plants" section
const LeafIconSmall = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 0C8 0 0 1.5 0 9C0 16.5 8 18 8 18C8 18 16 16.5 16 9C16 1.5 8 0 8 0Z"
      fill="#22C55E"
    />
  </svg>
)

// Plus Icon
const PlusIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 3.5V13.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3.5 8.5H13.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchPlants = async () => {
    try {
      const response = await fetch('/api/plants')
      if (!response.ok) {
        throw new Error('Failed to fetch plants')
      }
      const data = await response.json()
      setPlants(data.plants || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching plants:', err)
      setError('Failed to load plants. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlants()
  }, [])

  const handlePlantAdded = () => {
    fetchPlants()
  }

  const handlePlantWatered = () => {
    fetchPlants()
  }

  const handlePlantDeleted = () => {
    fetchPlants()
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Header />

      <main className="max-w-[1280px] mx-auto px-10 py-8">
        {/* Container */}
        <div className="max-w-[1024px]">
          {/* My Plants Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[30px] font-bold text-[#292524]">My Plants</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-[#22C55E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#16A34A] transition-colors"
            >
              <PlusIcon />
              <span>Add New Plant</span>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-[#E7E5E4] border-t-[#22C55E] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#78716C]">Loading your plants...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchPlants}
                className="text-[#22C55E] hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Upcoming Tasks Section */}
              <section className="mb-10">
                <TasksTable plants={plants} />
              </section>

              {/* All Plants Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <LeafIconSmall />
                  <h3 className="text-xl font-semibold text-[#44403C]">All Plants</h3>
                </div>

                {plants.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-[#78716C] mb-4">No plants yet. Add your first plant!</p>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="text-[#22C55E] hover:underline"
                    >
                      Add a plant
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-6">
                    {plants.map((plant) => (
                      <PlantCard
                        key={plant.id}
                        id={plant.id}
                        name={plant.name}
                        waterDays={plant.waterDays}
                        imageUrl={plant.image_url || undefined}
                        hasImage={!!plant.image_url}
                        onWater={handlePlantWatered}
                        onDelete={handlePlantDeleted}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      {/* Add Plant Modal */}
      <AddPlantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handlePlantAdded}
      />
    </div>
  )
}
