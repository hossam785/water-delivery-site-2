import Services from "@/components/Services";
import Link from "next/link";
import { ChevronLeft, Home, Layers } from "lucide-react";

// منع الكاش نهائياً لضمان الحيوية المطلقة للبيانات (ثابت كما هو)
export const dynamic = 'force-dynamic';

export default function AllServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] relative overflow-hidden text-slate-300">
      
      {/* هالات ضوئية خلفية لتعميق الطابع الفخم الـ VIP في كامل الصفحة */}
      <div className="absolute top-[-10%] right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      {/* بانر علوي فاخر ومطور بالكامل (VIP Banner) */}
      <div className="relative border-b border-slate-800/40 bg-slate-900/20 backdrop-blur-sm py-20 text-center">
        <div className="relative z-10 container mx-auto px-5 md:px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-4">
          
          {/* أيقونة شارة الخدمات الملوكية */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-sky-500/5 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)] mb-2">
            <Layers className="w-5 h-5 text-blue-400" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
            دليل خدمات التوصيل المتاحة
          </h1>
          
          <p className="text-slate-400 text-xs md:text-sm font-medium max-w-xl mx-auto leading-relaxed">
            تصفح باقات التوصيل المتنوعة للأحجام والسعات المختلفة، المجهزة كلياً لتلبية احتياجات المنازل والمشاريع على مدار الساعة.
          </p>
          
          {/* مسار الصفحة (Breadcrumbs) بتصميم زجاجي راقي ومتوافق مع الموبايل */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#070D19]/60 border border-slate-800/50 text-xs font-bold text-slate-400 shadow-inner">
            <Link href="/" className="group flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-300">
              <Home size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>الرئيسية</span>
            </Link>
            <ChevronLeft size={14} className="text-slate-600" />
            <span className="text-white font-black">باقات الخدمات</span>
          </div>
          
        </div>
      </div>

      {/* عرض المكون المجمع الذي يجلب كل الخدمات من السيرفر */}
      {/* التنسيق هنا يضمن عدم تداخل الكروت ويفرشها بالفخامة المتناسقة مع الموبايل بالملي */}
      <div className="pb-24 pt-12 relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-slate-900/10 backdrop-blur-xl border border-slate-800/30 p-2 md:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
          <Services />
        </div>
      </div>
      
    </main>
  );
}