"use client"; // مهم جداً لأن هذا المكون يتفاعل مع المستخدم مباشرة (ثابت كما هو)

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";
import { Droplet } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [siteName, setSiteName] = useState("وايت مياه الرياض");
  const [phoneNum, setPhoneNum] = useState("0500000000");

  // 👇 جلب بيانات الفوتر حية (ثابت تماماً بدون أي تعديل في الـ Logic)
  useEffect(() => {
    const fetchFooterData = async () => {
      const { data: settings } = await supabase
        .from("settings")
        .select("site_name, phone")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (settings?.site_name) setSiteName(settings.site_name);
      if (settings?.phone) setPhoneNum(settings.phone.toString());
    };
    fetchFooterData();
  }, [pathname]);

  // إخفاء المكون تماماً داخل لوحة تحكم الأدمن (ثابت كما هو)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-[#070C14] text-slate-400 py-10 border-t border-slate-800/40 text-center text-xs font-semibold tracking-wide">
      
      {/* لمسة ضوئية خافتة جداً في أسفل الفوتر لربطه بمنظومة النيون الفخمة */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-5 space-y-3.5 max-w-4xl animate-fadeIn">
        
        {/* شعار واسم المنصة المطور بنسق براق */}
        <div className="flex justify-center items-center gap-2 text-white font-black text-sm sm:text-base tracking-wide">
          <Droplet size={16} className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" fill="currentColor" />
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">{siteName}</span>
        </div>
        
        {/* حقوق الملكية الفخمة */}
        <p className="text-slate-500 font-bold text-[11px] sm:text-xs">
          © {new Date().getFullYear()} جميع الحقوق محفوظة لـ <span className="text-slate-400">{siteName}</span>.
        </p>
        
        {/* رقم هاتف الدعم بالتنسيق الاحترافي الفخم */}
        <p dir="ltr" className="text-[10px] font-mono font-black text-slate-600 tracking-wider pt-1">
          SUPPORT PHONE: <span className="text-slate-500">{phoneNum}</span>
        </p>

      </div>
    </footer>
  );
}