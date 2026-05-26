import { createClient } from '@supabase/supabase-js';

// جلب الروابط السرية التي وضعناها في ملف .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// التأكد من أن المفاتيح موجودة ولا توجد بها مشاكل قبل الاتصال
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('مفاتيح الاتصال بـ Supabase غير موجودة في ملف .env.local');
}

// إنشاء "عميل الاتصال" وتصديره لكي نستخدمه في كل الموقع
export const supabase = createClient(supabaseUrl, supabaseAnonKey);