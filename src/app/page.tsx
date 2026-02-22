import { Header, PlantCard, TasksTable } from '@/components'

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

const plants = [
  { id: 1, name: 'Fiddle Leaf Fig', waterDays: 2, hasImage: false },
  { id: 2, name: 'Snake Plant', waterDays: 5, hasImage: false },
  { id: 3, name: 'Monstera', waterDays: 3, hasImage: false },
  { id: 4, name: 'Pothos', waterDays: 4, hasImage: false },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Header />

      <main className="max-w-[1280px] mx-auto px-10 py-8">
        {/* Container */}
        <div className="max-w-[1024px]">
          {/* My Plants Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[30px] font-bold text-[#292524]">My Plants</h2>
            <button className="flex items-center gap-2 bg-[#22C55E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#16A34A] transition-colors">
              <PlusIcon />
              <span>Add New Plant</span>
            </button>
          </div>

          {/* Upcoming Tasks Section */}
          <section className="mb-10">
            <TasksTable />
          </section>

          {/* All Plants Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <LeafIconSmall />
              <h3 className="text-xl font-semibold text-[#44403C]">All Plants</h3>
            </div>

            <div className="flex flex-wrap gap-6">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  name={plant.name}
                  waterDays={plant.waterDays}
                  hasImage={plant.hasImage}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
