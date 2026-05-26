"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function ViewCounter() {
  useEffect(() => {
    // وظيفة تسجل صفاً جديداً في الجدول مع كل زيارة
    const recordVisit = async () => {
      // نتحقق من Session Storage عشان مانعدش نفس اليوزر لو عمل ريفريش 100 مرة في نفس الجلسة
      if (!sessionStorage.getItem("visited")) {
        await supabase.from("page_views").insert([{ page_name: "الرئيسية" }]);
        sessionStorage.setItem("visited", "true");
      }
    };

    recordVisit();
  }, []);

  // هذا المكون مخفي تماماً ولا يعرض أي شيء على الشاشة
  return null; 
}