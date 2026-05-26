"use client"; // الصفحة هتفضل كـ Client Component

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { MapPin, ArrowRight, Phone, MessageCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SingleAreaDetails() {
  const { slug } = useParams(); // بنجيب الـ slug من الـ URL مباشرة
  const [area, setArea] = useState<any>(null);
  const [phone, setPhone] = useState("0500000000");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // بنجيب البيانات من السيرفر جوه الـ useEffect
      const [areaRes, settingsRes] = await Promise.all([
        supabase.from("areas").select("*").eq("slug", slug).single(),
        supabase.from("settings").select("phone").limit(1).maybeSingle()
      ]);

      if (areaRes.error || !areaRes.data) {
        setArea(null);
      } else {
        setArea(areaRes.data);
      }
      
      if (settingsRes.data?.phone) {
        setPhone(settingsRes.data.phone.toString());
      }
      
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white"><Loader2 className="animate-spin" size={40}/></div>;
  if (!area) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] pt-28 pb-20 relative overflow-hidden text-slate-300">
      {/* هنا هتحط كود الديزاين الفخم بتاعك زي ما هو بالظبط */}
      <div className="container mx-auto px-5 max-w-4xl relative z-10">
        <div className="mb-8">
           <Link href="/areas" className="inline-flex items-center gap-3 bg-slate-900/40 border border-slate-800/60 px-5 py-3 rounded-xl font-bold text-xs hover:text-white transition-all">
             <ArrowRight size={16} /> العودة لجميع الأحياء
           </Link>
        </div>
        
        <div className="bg-slate-900/30 backdrop-blur-xl rounded-[2.5rem] border border-slate-800/60 p-10 text-center shadow-2xl">
          <h1 className="text-3xl font-black text-white mb-6">خدمة وايت مياه في {area.area_name}</h1>
          <p className="text-slate-400 mb-10 text-lg leading-relaxed">{area.description}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/966${phone.replace(/^0/, '')}`} className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-black flex items-center gap-2">
              <MessageCircle size={20}/> واتساب
            </a>
            <a href={`tel:${phone}`} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black flex items-center gap-2">
              <Phone size={20}/> اتصال مباشر
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}