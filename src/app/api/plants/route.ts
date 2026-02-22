import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/plants - 获取用户的植物列表
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: plants, error } = await supabase
      .from('plants')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 计算动态字段
    const plantsWithComputed = plants.map(plant => {
      const today = new Date()
      const lastWatered = new Date(plant.last_watered_at)
      const lastFertilized = new Date(plant.last_fertilized_at)

      const waterDays = Math.ceil(
        (lastWatered.getTime() + plant.watering_interval_days * 24 * 60 * 60 * 1000 - today.getTime()) / (24 * 60 * 60 * 1000)
      )

      const fertilizeDays = Math.ceil(
        (lastFertilized.getTime() + plant.fertilization_interval_weeks * 7 * 24 * 60 * 60 * 1000 - today.getTime()) / (24 * 60 * 60 * 1000)
      )

      return {
        ...plant,
        waterDays,
        fertilizeDays,
        watering: waterDays <= 0 ? 'Today' : waterDays === 1 ? 'Tomorrow' : `In ${waterDays} days`,
        fertilization: fertilizeDays <= 0 ? 'Today' : fertilizeDays < 7 ? 'This week' : `In ${Math.ceil(fertilizeDays / 7)} weeks`,
      }
    })

    return NextResponse.json({ plants: plantsWithComputed })
  } catch (error) {
    console.error('Error fetching plants:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/plants - 创建新植物
export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, image_url, sunlight_requirement, watering_interval_days, fertilization_interval_weeks } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const { data: plant, error } = await supabase
      .from('plants')
      .insert({
        user_id: user.id,
        name,
        image_url,
        sunlight_requirement: sunlight_requirement || 'Bright, indirect',
        watering_interval_days: watering_interval_days || 7,
        fertilization_interval_weeks: fertilization_interval_weeks || 4,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ plant })
  } catch (error) {
    console.error('Error creating plant:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
