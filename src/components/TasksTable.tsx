'use client'

import React from 'react'

interface Task {
  plant: string
  watering: string
  sunlight: string
  fertilization: string
}

const tasks: Task[] = [
  { plant: 'Fiddle Leaf Fig', watering: 'In 2 days', sunlight: 'Bright, indirect', fertilization: 'In 3 weeks' },
  { plant: 'Snake Plant', watering: 'In 5 days', sunlight: 'Low to bright, indirect', fertilization: 'In 6 weeks' },
  { plant: 'Monstera', watering: 'In 3 days', sunlight: 'Bright, indirect', fertilization: 'In 4 weeks' },
]

// Calendar Icon
const CalendarIcon = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="3" width="18" height="18" rx="2" stroke="#22C55E" strokeWidth="2" fill="none"/>
    <path d="M1 8H19" stroke="#22C55E" strokeWidth="2"/>
    <path d="M6 1V5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 1V5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const TasksTable: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon />
        <h3 className="text-xl font-semibold text-[#44403C]">Upcoming Tasks</h3>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#F5F5F4] text-xs font-medium text-[#57534E] uppercase tracking-wide">
              <th className="text-left px-4 py-3 w-[252px]">Plant</th>
              <th className="text-left px-4 py-3 w-[191px]">Watering</th>
              <th className="text-left px-4 py-3 w-[343px]">Sunlight</th>
              <th className="text-left px-4 py-3 w-[236px]">Fertilization</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.plant}
                className={`border-t border-[#E7E5E4] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF9]'}`}
              >
                <td className="px-4 py-3 text-sm font-medium text-[#292524]">{task.plant}</td>
                <td className="px-4 py-3 text-sm text-[#78716C]">{task.watering}</td>
                <td className="px-4 py-3 text-sm text-[#78716C]">{task.sunlight}</td>
                <td className="px-4 py-3 text-sm text-[#78716C]">{task.fertilization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TasksTable
