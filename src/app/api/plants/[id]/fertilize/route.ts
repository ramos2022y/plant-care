import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// POST /api/plants/[id]/fertilize - 记录施肥
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: plant, error } = await supabase
      .from('plants')
      .update({ last_fertilized_at: new Date().toISOString().split('T')[0] })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ plant })
  } catch (error) {
    console.error('Error fertilizing plant:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
