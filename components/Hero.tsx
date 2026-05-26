import { Phone, MessageCircle } from "lucide-react";

export default function Hero({ phone }: { phone: string }) {
  return (
    <section className="relative pt-24 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] overflow-hidden">
      
      {/* هالات ضوئية خلفية لتعميق الطابع الـ VIP */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-5 text-center relative z-10 max-w-4xl">
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[1.2] tracking-tight">
          توصيل مياه شرب ونظيفة <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">بجميع أحياء الرياض</span>
        </h1>
        
        <p className="text-sm md:text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          أفضل وايتات مياه مجهزة تماماً وبأعلى معايير التعقيم لتلبية احتياجات المسابح، المنازل، والمشاريع الكبرى بسرعة واحترافية.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* زر واتساب نيون */}
          <a 
            href={`https://wa.me/966${phone.replace(/^0/, '')}?text=مرحباً، أريد طلب وايت مياه`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-2xl font-black text-base md:text-lg transition-all shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle size={22} />
            تواصل عبر واتساب
          </a>
          
          {/* زر اتصال مباشر */}
          <a 
            href={`tel:${phone}`}
            className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-black text-base md:text-lg transition-all border border-slate-700 hover:border-slate-600 active:scale-[0.98]"
          >
            <Phone size={22} />
            اتصال مباشر
          </a>
        </div>

      </div>
    </section>
  );
}