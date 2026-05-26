import { MapPin, ChevronLeft, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

// منع الكاش نهائياً لضمان الحيوية المطلقة للبيانات (ثابت كما هو)
export const dynamic = 'force-dynamic';

export default async function Areas() {
  // جلب البيانات من سوبابيز (ثابت بدون تعديل)
  const { data: areasList, error } = await supabase
    .from("areas")
    .select("*")
    .order("id");

  // 👇 شاشة التنبيه الفخمة المحدثة بالكامل لو الجدول فارغ أو حصل خطأ
  if (error || !areasList || areasList.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-[#050B14] to-[#0A1120] text-center text-slate-300">
        <div className="container mx-auto px-5 max-w-xl flex flex-col items-center animate-fadeIn">
          <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-400 mb-5 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
            <AlertCircle size={28} />
          </div>
          <h3 className="text-lg font-black text-white mb-2 tracking-wide">جاري تهيئة وتحديث النطاق</h3>
          <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-sm">
            نحن حالياً نقوم بجدولة وتحديث خريطة الأحياء المدعومة في الرياض. يمكنك النقر على أزرار الاتصال لطلب وايت لأي حي فوراً!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] overflow-hidden text-slate-300">
      
      {/* هالات ضوئية محيطية ناعمة */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-5 md:px-4 max-w-7xl relative z-10">
        
        {/* رأس القسم المطور */}
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="inline-block px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs mb-4 tracking-wide shadow-md">
            📍 شبكة نطاق التغطية الحية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            الأحياء والمناطق المغطاة بالرياض
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            نتميز بانتشار مكثف وسريع في كافة المربعات السكنية. اختر حيك السكني الآن واستعرض تفاصيل التغطية لطلب وايت فوري يصلك سريعاً.
          </p>
        </div>

        {/* شبكة الكروت الزجاجية المتوافقة بالملي مع شاشات الجوال */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {areasList.map((area) => (
            <Link href={`/areas/${area.slug}`} key={area.id} className="block outline-none group">
              <div className="relative flex flex-col justify-between p-5 md:p-6 bg-slate-900/30 backdrop-blur-xl rounded-2xl border border-slate-800/60 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-blue-500/30 hover:-translate-y-1 active:scale-[0.99] transition-all duration-500 cursor-pointer h-full overflow-hidden">
                
                {/* تأثير توهج نيون داخلي منساب عند الـ Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div>
                  {/* رأس الكارت الزجاجي والأيقونات */}
                  <div className="relative z-10 flex justify-between items-start mb-5 md:mb-6">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3.5 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500">
                      <MapPin className="text-white w-5 h-5 md:w-6 md:h-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" />
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-500 opacity-0 -translate-x-3 group-hover:translate-x-0 group-hover:opacity-100">
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* اسم الحي الفخم */}
                  <h3 className="relative z-10 text-base md:text-lg font-black text-white group-hover:text-blue-400 mb-2 transition-colors duration-300 tracking-wide">
                    {area.area_name}
                  </h3>
                  
                  {/* النبذة والوصف */}
                  <p className="relative z-10 text-slate-400 text-xs leading-relaxed line-clamp-2 font-medium">
                    {area.description}
                  </p>
                </div>

                {/* تذييل الكارت الجمالي الصامت لإعطاء اتزان هيكلي للـ UI */}
                <div className="w-full pt-4 mt-4 border-t border-slate-800/40 text-[10px] font-bold text-slate-500 tracking-wide flex justify-between items-center group-hover:text-slate-400 transition-colors">
                  <span>تفاصيل التوصيل والطلب</span>
                  <span className="font-mono text-slate-600 text-[9px]">/ID-{area.id}</span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}