import { supabase } from "../../lib/supabase";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck } from "lucide-react";

// منع الكاش نهائياً لضمان الحيوية المطلقة للبيانات (ثابت كما هو)
export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  // جلب رقم الهاتف حياً من جدول الإعدادات (ثابت بدون تعديل)
  const { data: settings } = await supabase
    .from("settings")
    .select("phone")
    .limit(1)
    .maybeSingle();

  const dynamicPhone = settings?.phone || "0500000000";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] pt-28 md:pt-36 pb-20 relative overflow-hidden flex flex-col justify-start text-slate-300">
      
      {/* هالات ضوئية في الخلفية لإعطاء عمق فخم للموقع */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-5 max-w-4xl relative z-10 text-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
        
        {/* شارة الترحيب الزجاجية */}
        <div className="mb-10 md:mb-12">
          <span className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs mb-4 inline-block tracking-wide shadow-md">
            ✨ تواصل معنا الآن
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            يسعدنا خدمتك وتلبية طلبك فورا
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium max-w-md mx-auto leading-relaxed">
            نوفر وايتات مياه سريعة ونظيفة ومطابقة للمواصفات لكافة أحياء ومناطق الرياض على مدار 24 ساعة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto items-stretch">
          
          {/* كارت الاتصال الهاتفي الفاخر */}
          <div className="bg-slate-900/30 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-slate-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center justify-between group transition-all duration-300 hover:border-blue-500/30">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl text-blue-400 mb-5 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Phone size={28} className="drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">اتصال مباشر</h3>
              <p className="text-slate-500 text-xs font-semibold mb-6">لطلبات الوايتات الفورية وتحديد السعر المباشر</p>
            </div>
            
            <a 
              href={`tel:${dynamicPhone}`}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg shadow-blue-600/10 hover:-translate-y-0.5 active:scale-[0.99] text-center"
            >
              <span dir="ltr" className="tracking-wider font-mono">{dynamicPhone}</span>
            </a>
          </div>

          {/* كارت الواتساب النيوني المطور */}
          <div className="bg-slate-900/30 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-slate-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center justify-between group transition-all duration-300 hover:border-emerald-500/30">
            <div className="flex flex-col items-center">
              <div className="bg-emerald-600/10 border border-emerald-500/20 p-4 rounded-2xl text-emerald-400 mb-5 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <MessageCircle size={28} className="drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">محادثة واتساب</h3>
              <p className="text-slate-500 text-xs font-semibold mb-6">للاستفسارات العامة، العقود، وحجوزات الخزانات</p>
            </div>
            
            <a 
              href={`https://wa.me/966${dynamicPhone.toString().replace(/^0/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg shadow-emerald-600/10 hover:-translate-y-0.5 active:scale-[0.99] text-center"
            >
              مراسلة فورية آمنة
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}