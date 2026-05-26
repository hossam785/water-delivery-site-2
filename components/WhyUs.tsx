import { ShieldCheck, Clock, Award, ThumbsUp } from "lucide-react";

const features = [
  {
    id: 1,
    title: "سرعة استجابة فائقة",
    description: "أسطولنا موزع في كافة أحياء الرياض لضمان وصول الوايت إليك في وقت قياسي.",
    icon: <Clock className="w-12 h-12 text-white mb-4" />,
  },
  {
    id: 2,
    title: "مياه نقية ومعقمة",
    description: "نلتزم بأعلى معايير الجودة والنظافة، فمياهنا صالحة للشرب ومطابقة للمواصفات الصحية.",
    icon: <ShieldCheck className="w-12 h-12 text-white mb-4" />,
  },
  {
    id: 3,
    title: "خدمة 24 ساعة",
    description: "نحن هنا لخدمتك على مدار الساعة، طوال أيام الأسبوع، لتلبية حالات الطوارئ.",
    icon: <Award className="w-12 h-12 text-white mb-4" />,
  },
  {
    id: 4,
    title: "أسعار تنافسية",
    description: "نقدم أفضل الأسعار في السوق مع الحفاظ على جودة الخدمة العالية لجميع عملائنا.",
    icon: <ThumbsUp className="w-12 h-12 text-white mb-4" />,
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-blue-900">
      <div className="container mx-auto px-4">
        
        {/* عنوان القسم (لاحظ أن النصوص هنا باللون الأبيض لأن الخلفية زرقاء داكنة) */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            لماذا تختار وايت الرياض؟
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            نحن لسنا مجرد خدمة توصيل مياه، بل نحن شريكك الموثوق الذي يضمن لك الراحة والجودة.
          </p>
        </div>

        {/* شبكة الميزات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center p-6 bg-blue-800/50 rounded-2xl border border-blue-700 hover:bg-blue-800 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-blue-600 p-4 rounded-full mb-6 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-blue-100 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}