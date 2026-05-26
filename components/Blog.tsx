import { supabase } from "../lib/supabase";
import { Calendar, Newspaper, ArrowLeft } from "lucide-react";

// منع الكاش نهائياً لضمان الحيوية المطلقة للمنشورات (ثابت كما هو)
export const dynamic = 'force-dynamic';

export default async function Blog() {
  // جلب البيانات من سوبابيز (ثابت بدون تعديل)
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error || !posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] overflow-hidden text-slate-300">
      
      {/* هالات ضوئية خلفية ناعمة لعمق بصري ملوكي */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-5 md:px-4 max-w-7xl relative z-10">
        
        {/* عنوان القسم الفاخر والمطور */}
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="inline-block px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs mb-4 tracking-wide shadow-md">
            📰 أحدث التقارير والتنبيهات
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            منشورات وتنبيهات حية
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            تابع أحدث عروضنا وتغطياتنا الميدانية، والتحذيرات الدورية للحفاظ على سلامة ونظافة خزانات المياه.
          </p>
        </div>

        {/* شبكة الكروت الزجاجية فائقة الأناقة (VIP UI) المتوافقة مع الموبايل */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {posts.map((post) => (
            <div key={post.id} className="group bg-slate-900/30 backdrop-blur-xl rounded-2xl border border-slate-800/60 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-blue-500/30 hover:-translate-y-1 active:scale-[0.99] transition-all duration-500 flex flex-col h-full overflow-hidden cursor-pointer">
              
              {/* منطقة الصورة الاحترافية */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#070D19] border-b border-slate-800/40">
                
                {/* شريط التاريخ الزجاجي العائم المطور */}
                <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 text-blue-400 text-[10px] font-black bg-[#0A0F1D]/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-800/60">
                  <Calendar size={12} />
                  <span>{new Date(post.created_at).toLocaleDateString('ar-EG')}</span>
                </div>

                {/* تدرج ظلي ناعم يظهر عند التمرير */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B13]/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {post.featured_image ? (
                  <img 
                    src={post.featured_image} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-950/20 to-slate-900/40 flex items-center justify-center">
                    <Newspaper className="text-slate-700 w-12 h-12 group-hover:scale-105 group-hover:text-blue-500/40 transition-all duration-500 drop-shadow-sm" />
                  </div>
                )}
              </div>
              
              {/* محتوى الكارت الزجاجي */}
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* العنوان الفخم للمقال */}
                  <h3 className="text-base font-black text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 tracking-wide">
                    {post.title}
                  </h3>
                  
                  {/* النبذة والمحتوى المختصر */}
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-medium mb-5">
                    {post.content}
                  </p>
                </div>

                {/* زر التفاعل (Read More) المطور نيونياً */}
                <div className="flex items-center gap-1.5 text-blue-400 font-black text-xs pt-4 border-t border-slate-800/40 group-hover:text-blue-300 transition-colors">
                  <span>تفاصيل المنشور كاملاً</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
                </div>
              </div>
              
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}