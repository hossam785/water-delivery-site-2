import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import { Droplet, ArrowRight, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

// منع الكاش نهائياً لضمان الحيوية المطلقة للبيانات (ثابت كما هو)
export const dynamic = 'force-dynamic';

export default async function SingleServiceDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // جلب تفاصيل الخدمة وجلب إعدادات الموقع (الهاتف) في نفس الوقت (ثابت بدون تعديل)
  const [serviceRes, settingsRes] = await Promise.all([
    supabase.from("services").select("*").eq("slug", slug).single(),
    supabase.from("settings").select("phone").limit(1).maybeSingle()
  ]);

  if (serviceRes.error || !serviceRes.data) {
    notFound();
  }

  const service = serviceRes.data;
  // لو مش موجود رقم في الداتا بيز هيحط الرقم الافتراضي ده كـ احتياط
  const dynamicPhone = settingsRes.data?.phone || "0500000000"; 

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] pt-28 md:pt-36 pb-20 md:pb-28 relative overflow-hidden flex flex-col justify-start text-slate-300">
      
      {/* هالات ضوئية خلفية لتعميق الطابع الفخم الـ VIP */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-5 md:px-4 max-w-5xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* زر العودة بتنسيق زجاجي تفاعلي مبهر */}
        <div className="mb-8 md:mb-10 flex justify-start">
          <Link href="/services" className="group inline-flex items-center gap-3 bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md border border-slate-800/60 text-slate-400 hover:text-white px-5 py-3 rounded-xl font-bold text-xs tracking-wide transition-all shadow-lg active:scale-95">
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            العودة لجميع الخدمات المتاحة
          </Link>
        </div>

        {/* الكارت الزجاجي الرئيسي الفاخر */}
        <div className="bg-slate-900/30 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-slate-800/60 p-6 sm:p-10 md:p-14 text-center relative overflow-hidden group">
          
          {/* الخط النيوني العلوي المنساب */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 shadow-[0_2px_15px_rgba(37,99,235,0.4)]"></div>

          {/* معالجة الصورة البارزة أو الأيقونة التعبيرية بشكل ملوكي */}
          {service.image ? (
            <div className="relative w-full h-64 md:h-[450px] rounded-[2rem] overflow-hidden mb-10 md:mb-12 shadow-[0_15px_50px_rgba(0,0,0,0.4)] border border-slate-800/50 bg-[#070D19]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#060B13]/40 to-transparent z-10 pointer-events-none"></div>
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
              />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-26 md:h-26 bg-gradient-to-br from-blue-600/10 to-indigo-600/5 rounded-3xl mb-8 md:mb-10 shadow-inner border border-blue-500/20 relative group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl animate-ping opacity-30"></div>
              <Droplet className="w-10 h-10 md:w-11 md:h-11 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
            </div>
          )}
          
          {/* عنوان الخدمة بخلفية براقة */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 md:mb-8 tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {service.title}
          </h1>
          
          {/* تفاصيل وشرح الخدمة المريح جداً للقرّاء ومحركات البحث */}
          <p className="text-sm sm:text-base md:text-xl text-slate-400 leading-relaxed md:leading-loose mb-10 max-w-3xl mx-auto font-medium">
            {service.description}
          </p>

          {/* أزرار الاتصال التفاعلية الفخمة والملائمة للموبايل كلياً */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            
            {/* زر الواتساب الديناميكي النيوني */}
            <a 
              href={`https://wa.me/966${dynamicPhone.toString().replace(/^0/, '')}?text=أريد طلب خدمة: ${service.title}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-7 py-4 rounded-xl font-black text-sm transition-all shadow-[0_10px_25px_rgba(16,185,129,0.15)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <MessageCircle size={20} className="group-hover:scale-110 transition-transform duration-300" /> 
              طلب الخدمة عبر واتساب
            </a>
            
            {/* زر الاتصال الديناميكي الفاخر */}
            <a 
              href={`tel:${dynamicPhone}`} 
              className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-7 py-4 rounded-xl font-black text-sm transition-all shadow-[0_10px_25px_rgba(37,99,235,0.15)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <Phone size={20} className="group-hover:rotate-12 transition-transform duration-300" /> 
              اتصال هاتفي مباشر
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}