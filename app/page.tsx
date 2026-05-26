import { supabase } from "@/lib/supabase";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Areas from "@/components/Areas";
import Blog from "@/components/Blog"; // مكون المنشورات
import MapSection from "@/components/MapSection"; // مكون الخريطة
import ViewCounter from "@/components/ViewCounter";

// منع الكاش نهائياً في الصفحة الرئيسية لضمان الحيوية (ثابت كما هو)
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // جلب رقم الهاتف ديناميكياً من قاعدة البيانات لإرساله للـ Hero (ثابت بدون تعديل)
  const { data: settings } = await supabase
    .from("settings")
    .select("phone")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  const dynamicPhone = settings?.phone || "0500000000";

  return (
    // تم ضبط الحاوية الأساسية بالتدرج الملوكي المظلم وتأمين أبعاد الموبايل والكمبيوتر
    <div className="flex flex-col min-h-screen bg-[#050B14] text-slate-300 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* هالات نيونية ناعمة وعميقة في الخلفية لإعطاء طابع الـ VIP الفخم */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* مكون عداد الزيارات الصامت والمخفي */}
      <ViewCounter />

      {/* 1. قسم الواجهة والطلب السريع المربوط بالهاتف الحي */}
      <Hero phone={dynamicPhone} />
      
      {/* حاويات زجاجية ناعمة (Glassmorphism Wrappers) لاحتواء المكونات وفرشها بنقاء بدون أي تداخل بصري */}
      
      {/* 2. قسم المنشورات وتنبيهات حية (بديل لماذا تختارنا وقبل الخدمات بالملي) */}
      <div className="w-full relative z-10 py-6 sm:py-10">
        <Blog />
      </div>
      
      {/* 3. قسم الخدمات المتميزة في الرياض */}
      <div className="w-full relative z-10 py-6 sm:py-10 bg-slate-900/10 backdrop-blur-sm border-y border-slate-800/20">
        <Services />
      </div>
      
      {/* 4. قسم الأحياء والمناطق المغطاة لتوصيل المياه */}
      <div className="w-full relative z-10 py-6 sm:py-10">
        <Areas />
      </div>
      
      {/* 5. قسم الخريطة التفاعلية الحية (استقرت هنا مباشرة بعد الأحياء في الآخر قبل الفوتر) */}
      <div className="w-full relative z-10 border-t border-slate-800/40 shadow-[0_-15px_40px_rgba(0,0,0,0.4)]">
        <MapSection />
      </div>

    </div>
  );
}