"use client"; // مهم جداً لأن هذا المكون يتفاعل مع المستخدم مباشرة (ثابت كما هو)

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [phoneNum, setPhoneNum] = useState("0500000000");

  // 👇 جلب رقم الهاتف الفوري (ثابت تماماً بدون أي تعديل في الـ Logic)
  useEffect(() => {
    const getWhatsAppNumber = async () => {
      const { data: settings } = await supabase
        .from("settings")
        .select("phone")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (settings?.phone) {
        setPhoneNum(settings.phone.toString());
      }
    };
    getWhatsAppNumber();
  }, [pathname]);

  // إخفاء المكون تماماً داخل لوحة تحكم الأدمن (ثابت كما هو)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center justify-center">
      
      {/* هالة نيونية عائمة عريضة تنبض بنعومة بالخلفية لجذب انتباه العميل على الجوال */}
      <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-md animate-ping pointer-events-none" />

      <a
        href={`https://wa.me/966${phoneNum.replace(/^0/, '')}?text=مرحباً، أريد الاستفسار عن طلب وايت مياه`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-4 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.4)] border border-emerald-400/20 hover:from-emerald-400 hover:to-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 ease-out group"
        aria-label="تواصل معنا عبر واتساب"
      >
        {/* الأيقونة التفاعلية المحدثة */}
        <MessageCircle 
          size={26} 
          className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300" 
        />
      </a>

    </div>
  );
}