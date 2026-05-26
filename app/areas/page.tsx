import Areas from "@/components/Areas";
import Link from "next/link";
import { ChevronLeft, MapPin, Compass } from "lucide-react";

// منع الكاش نهائياً في صفحة الأحياء لضمان الحيوية (ثابت كما هو)
export const dynamic = 'force-dynamic';

export default function AllAreasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] relative overflow-hidden text-slate-300">
      
      {/* عناصر توهج ضوئي في الخلفية لإعطاء عمق بصري فخم */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* البانر العلوي الفاخر بتصميم زجاجي معتم */}
      <div className="relative border-b border-slate-800/40 bg-slate-900/20 backdrop-blur-sm py-20 text-center">
        <div className="container mx-auto px-4 relative z-10 space-y-4">
          
          {/* أيقونة النطاق الجغرافي الفخمة */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-sky-500/5 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)] mb-2 animate-pulse">
            <Compass className="w-5 h-5 text-blue-400" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
            النطاق الجغرافي والأحياء المغطاة
          </h1>
          
          <p className="text-slate-400 text-xs md:text-sm font-medium max-w-xl mx-auto leading-relaxed">
            تحرك سريع ووايتات مجهزة على مدار الساعة لتغطية كافة المربعات السكنية والمشاريع بأعلى كفاءة تشغيلية.
          </p>

          {/* خط التنقل التفاعلي (Breadcrumbs) */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#070D19]/60 border border-slate-800/50 text-xs font-bold text-slate-400 shadow-inner">
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              الرئيسية
            </Link>
            <ChevronLeft size={14} className="text-slate-600" />
            <span className="text-white font-black">شبكة الأحياء</span>
          </div>

        </div>
      </div>

      {/* منطقة عرض المكون المجمع الذي يجلب كل الأحياء من السيرفر */}
      {/* التنسيق هنا يضمن عدم تداخل الكروت ويفرشها بالفخامة المطلوبة */}
      <div className="pb-24 pt-12 relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-slate-900/10 backdrop-blur-xl border border-slate-800/30 p-2 md:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
          <Areas />
        </div>
      </div>

    </main>
  );
}