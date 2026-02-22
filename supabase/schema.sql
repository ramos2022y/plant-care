-- 植物表
CREATE TABLE IF NOT EXISTS plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT,
  sunlight_requirement TEXT DEFAULT 'Bright, indirect',
  watering_interval_days INTEGER DEFAULT 7,
  fertilization_interval_weeks INTEGER DEFAULT 4,
  last_watered_at DATE DEFAULT CURRENT_DATE,
  last_fertilized_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 RLS (Row Level Security)
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看自己的植物
CREATE POLICY "Users can view their own plants" ON plants
  FOR SELECT USING (auth.uid() = user_id);

-- 创建策略：用户只能插入自己的植物
CREATE POLICY "Users can insert their own plants" ON plants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 创建策略：用户只能更新自己的植物
CREATE POLICY "Users can update their own plants" ON plants
  FOR UPDATE USING (auth.uid() = user_id);

-- 创建策略：用户只能删除自己的植物
CREATE POLICY "Users can delete their own plants" ON plants
  FOR DELETE USING (auth.uid() = user_id);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_plants_updated_at
  BEFORE UPDATE ON plants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 创建索引
CREATE INDEX IF NOT EXISTS plants_user_id_idx ON plants(user_id);
