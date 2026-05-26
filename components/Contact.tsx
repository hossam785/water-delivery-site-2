"use client"; // مهم جداً لأن هذا المكون يتفاعل مع المستخدم مباشرة (ثابت كما هو)

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Send, Phone, MapPin, CheckCircle2, Loader2, MessageCircle, Sparkles } from "lucide-react";

export default function Contact() {
  // متغيرات لحفظ ما يكتبه المستخدم في الحقول (ثابتة بدون تعديل)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // 👇 متغير ديناميكي لحفظ رقم الهاتف والواتساب المجلوب من الداتا بيز (ثابت)
  const [dynamicPhone, setDynamicPhone] = useState("0500000000");

  // متغيرات لحالة الإرسال (جاري الإرسال، تم بنجاح، خطأ) (ثابتة)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 👇 جلب رقم الهاتف الحي من جدول الإعدادات فور تحميل السكشن (ثابت بدون تعديل)
  useEffect(() => {
    const fetchPhoneSettings = async () => {
      const { data: settings } = await supabase
        .from("settings")
        .select("phone")
        .limit(1)
        .maybeSingle();
        
      if (settings?.phone) {
        setDynamicPhone(settings.phone.toString());
      }
    };
    fetchPhoneSettings();
  }, []);

  // الدالة التي تعمل عند الضغط على زر الإرسال (ثابتة بدون تعديل)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setErrorMsg("");

    // إرسال البيانات إلى جدول contact_requests في Supabase
    const { error } = await supabase
      .from("contact_requests")
      .insert([
        { name: name, phone: phone, message: message }
      ]);

    setIsSubmitting(false);

    if (error) {
      setErrorMsg("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.");
      console.error(error);
    } else {
      setIsSuccess(true);
      setName("");
      setPhone("");
      setMessage("");
      
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] overflow-hidden text-slate-300">
      
      {/* هالات نيونية محيطية بالخلفية لمنع الوميض وضمان الفخامة */}
      <div className="absolute top-0 left-[-10%] w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-[-10%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* رأس القسم الفاخر والمطور */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs mb-4 tracking-wide shadow-md">
            ✨ طلب ذكي سريع
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            اطلب وايت مياه الآن
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            سجل بياناتك في الحقول المخصصة وسيقوم النظام بتوجيه طلبك فوراً لأقرب ناقلة مياه متواجدة ضمن محيط حيك السكني.
          </p>
        </div>

        {/* صندوق الفورم والتواصل المشترك الزجاجي الفخم متوافق كلياً مع الجوال */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-slate-900/30 backdrop-blur-xl p-5 sm:p-8 rounded-[2.5rem] border border-slate-800/60 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
          
          {/* القسم الأيمن: نموذج الإدخال المؤتمت بالكامل */}
          <div className="order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-300 pr-1 tracking-wide">الاسم الكريم</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#070D19]/80 border border-slate-800 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-200 text-xs font-bold"
                  placeholder="اكتب اسمك الثلاثي"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-300 pr-1 tracking-wide">رقم الجوال الخاص بك</label>
                <input 
                  type="text" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#070D19]/80 border border-slate-800 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-200 text-xs font-mono tracking-wider text-left"
                  placeholder="05X XXX XXXX"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-300 pr-1 tracking-wide">الطلب أو تفاصيل الموقع (اختياري)</label>
                <textarea 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#070D19]/80 border border-slate-800 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-200 text-xs font-semibold leading-relaxed resize-none"
                  placeholder="مثال: أحتاج وايت مياه سعة كبيرة لحي الياسمين..."
                ></textarea>
              </div>

              {/* معالجة وإظهار رسائل النجاح أو الخطأ بنقاء بVisual فخم */}
              {errorMsg && (
                <div className="bg-red-950/40 text-red-400 p-3 rounded-xl text-[11px] font-bold text-center border border-red-900/40 animate-fadeIn">
                  ⚠️ {errorMsg}
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/40 p-3.5 rounded-xl text-[11px] border border-emerald-900/40 shadow-inner animate-fadeIn">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>تم استلام معطيات طلبك بنجاح! جاري تخصيص السائق للتواصل.</span>
                </div>
              )}

              {/* زر الإرسال المتوهج والتفاعلي */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 active:scale-[0.99] transition-all text-xs flex justify-center items-center gap-2 disabled:from-blue-800 disabled:to-blue-900 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span>جاري ترحيل الطلب للمخدم...</span>
                    <Loader2 className="animate-spin text-blue-200" size={14} />
                  </>
                ) : (
                  <>
                    <span>تأكيد إرسال الطلب الفوري</span>
                    <Send size={14} />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* القسم الأيسر: لوحة معلومات التواصل السريعة والمباشرة */}
          <div className="order-1 md:order-2 bg-gradient-to-br from-blue-600/90 to-blue-700/90 text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-center space-y-5 border border-blue-500/20 shadow-blue-600/5">
            
            {/* زخرفة هندسية ضوئية داخل كارت الاتصال */}
            <div className="absolute bottom-[-20%] left-[-25%] w-[250px] h-[250px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <h3 className="text-lg font-black mb-1 relative z-10 flex items-center gap-1.5"><Sparkles size={16} className="text-blue-200"/>تواصل هاتفي مباشر</h3>
              <p className="text-blue-100 text-[11px] font-medium leading-relaxed relative z-10">
                في حال رغبتك بالطلب اللحظي والسريع، يمكنك تخطي تعبئة الفورم والنقر المباشر على أزرار الاتصال والمحادثة المباشرة المتوفرة على مدار الساعة.
              </p>
            </div>
            
            {/* زر الاتصال الهاتفي الحي والمحاط بظلال نيون ناعمة */}
            <a 
              href={`tel:${dynamicPhone}`}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-3.5 rounded-xl transition-all border border-white/10 group relative z-10 active:scale-[0.99]"
            >
              <div className="w-11 h-11 bg-white text-blue-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <Phone size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="truncate">
                <p className="text-blue-200 text-[10px] font-black">اضغط للاتصال المباشر بالسائق</p>
                <p className="font-mono font-black text-md sm:text-lg tracking-wider mt-0.5" dir="ltr">{dynamicPhone}</p>
              </div>
            </a>

            {/* زر الواتساب الحي والمربوط بنظام النيون المتوهج للموبايل */}
            <a 
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/966${dynamicPhone.replace(/^0/, '')}?text=مرحباً، أريد طلب وايت مياه`}
              className="flex items-center gap-4 bg-emerald-500 hover:bg-emerald-400 p-3.5 rounded-xl transition-all border border-emerald-400/20 group relative z-10 shadow-lg shadow-emerald-700/20 active:scale-[0.99]"
            >
              <div className="w-11 h-11 bg-white text-emerald-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <p className="text-emerald-100 text-[10px] font-black">مراسلة نصية مشفرة وحية</p>
                <p className="font-black text-xs sm:text-sm mt-0.5 tracking-wide">فتح محادثة واتساب فورية</p>
              </div>
            </a>

            {/* شريط اللوكيشن السفلي المتزن هيكلياً */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10 relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <MapPin size={16} className="text-white" />
              </div>
              <div className="truncate">
                <p className="text-blue-200 text-[10px] font-black">تغطية النطاق اللوجستي للموقع</p>
                <p className="font-bold text-xs mt-0.5 truncate">المملكة العربية السعودية، مدينة الرياض برمتها</p>
              </div>
            </div> 
          </div> 
        </div> 
      </div> 
    </section>
  );
}
