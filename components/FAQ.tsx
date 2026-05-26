"use client"; // مهم جداً لأن هذا المكون يتفاعل مع المستخدم مباشرة (ثابت كما هو)

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "ما هي أحجام وايتات المياه المتوفرة لديكم؟",
    answer: "نوفر أحجاماً متنوعة تناسب كافة الاحتياجات، منها وايت 19 طن ووايت 32 طن، بالإضافة إلى السعات الصغيرة والمتوسطة للمنازل."
  },
  {
    question: "كم يستغرق وصول الوايت بعد طلب الخدمة？",
    answer: "نلتزم بالسرعة القصوى، وبفضل توزيع أسطولنا في أحياء الرياض، نصلك غالباً في غضون 30 إلى 60 دقيقة من وقت الطلب."
  },
  {
    question: "هل المياه المتوفرة صالحة للشرب؟",
    answer: "نعم بكل تأكيد، مياهنا نقية ومعقمة ومطابقة للمواصفات الصحية والبيئية المعتمدة في المملكة العربية السعودية."
  },
  {
    question: "هل تتوفر خدمتكم على مدار 24 ساعة؟",
    answer: "نعم، فريقنا يعمل بنظام النوبات على مدار الساعة طوال أيام الأسبوع، بما في ذلك العطلات الرسمية."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] overflow-hidden text-slate-300">
      
      {/* هالات ضوئية خلفية لتعميق الطابع الفخم الـ VIP */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        
        {/* رأس السكشن الفاخر والمطور */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs mb-4 tracking-wide shadow-md">
            💬 الإجابات الفورية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            الأسئلة الشائعة والمكررة
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
            كل ما تود معرفته عن آليات العمل، سعات صهاريج التوصيل، ومعايير نقاء وجودة المياه في الرياض.
          </p>
        </div>

        {/* قائمة الأسئلة الشائعة بنظام الأكورديون النيوني المتوافق مع الجوال بالملي */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-slate-900/30 backdrop-blur-xl rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${isOpen ? "border-blue-500/40 shadow-blue-500/5 bg-slate-900/50" : "border-slate-800/60 hover:border-slate-700/80"}`}
              >
                {/* زر السؤال التفاعلي */}
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right font-black text-xs md:text-sm text-white hover:bg-slate-800/30 transition-all outline-none gap-4"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={16} className={`flex-shrink-0 transition-colors ${isOpen ? "text-blue-400" : "text-slate-500"}`} />
                    <span className={`transition-colors tracking-wide ${isOpen ? "text-blue-400" : "text-slate-200"}`}>{faq.question}</span>
                  </div>
                  <div className={`p-1.5 rounded-xl bg-[#070D19] border border-slate-800 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-400 border-blue-500/30" : ""}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>
                
                {/* حقل الإجابة المشع */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 border-t border-slate-800/40" : "max-h-0 opacity-0 pointer-events-none"}`}
                >
                  <div className="p-4 md:p-5 text-xs md:text-sm text-slate-400 bg-[#070D19]/40 leading-relaxed md:leading-loose font-medium">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}