import { Droplet, ArrowLeft, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Services() {
  const { data: servicesList, error } = await supabase
    .from("services")
    .select("*")
    .order("id");

  // معالجة الخطأ أو خلو الجدول بتصميم داكن فخم
  if (error || !servicesList || servicesList.length === 0) {
    return (
      <section className="py-16 bg-[#050B14] text-center text-slate-400">
        <div className="container mx-auto px-5 max-w-xl flex flex-col items-center">
          <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-400 mb-5 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-lg font-black text-white mb-2 tracking-wide">جاري تحديث وتجهيز باقات الخدمات</h3>
          <p className="text-xs font-medium leading-relaxed max-w-sm">
            نحن حالياً نحدث قائمة أسطولنا وعروضنا. لا تتردد في الاتصال بنا مباشرة لطلب وايت للمسابح أو الخزانات فوراً!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] overflow-hidden text-slate-300">
      
      {/* هالات ضوئية خلفية لتعميق الطابع الفخم */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-5 md:px-4 max-w-7xl relative z-10">
        
        {/* عنوان السكشن المطور */}
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="inline-block px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs mb-4 tracking-wide shadow-md">
            💧 حلول مياه احترافية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            خدمات التوصيل المتميزة بالرياض
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            باقات مخصصة لكل احتياجاتك.. مياه شرب ونظافة بأعلى معايير التعقيم العالمية لضمان راحتكم.
          </p>
        </div>

        {/* شبكة الكروت الزجاجية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {servicesList.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.id} className="block outline-none group h-full">
              <div className="bg-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-800/60 shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/30 hover:-translate-y-2 active:scale-[0.98] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full relative">
                
                {/* منطقة الصورة أو الأيقونة الفخمة */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#070D19] border-b border-slate-800/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {service.image ? (
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                      <Droplet className="w-16 h-16 text-slate-700 group-hover:text-blue-500/40 transition-all duration-500" />
                    </div>
                  )}
                </div>

                {/* محتوى الكارت */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 tracking-wide">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6 flex-1 font-medium">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-blue-400 font-black text-xs mt-auto pt-5 border-t border-slate-800/40 group-hover:text-blue-300 transition-colors">
                    <span>استعراض الباقة</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}