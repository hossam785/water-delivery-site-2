"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Droplet, Phone, Menu, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [siteName, setSiteName] = useState("وايت مياه الرياض");
  const [phoneNum, setPhoneNum] = useState("0500000000");

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: settings } = await supabase
        .from("settings")
        .select("site_name, phone")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();
        
      if (settings?.site_name) setSiteName(settings.site_name);
      if (settings?.phone) setPhoneNum(settings.phone.toString());
    };
    fetchSettings();
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050B14]/80 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* الشعار والاسم */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
              <Droplet className="h-5 w-5 md:h-6 md:w-6 text-white" fill="currentColor" />
            </div>
            <span className="text-lg md:text-xl font-black text-white tracking-wide">{siteName}</span>
          </Link>

          {/* روابط التصفح (دسك توب) */}
          <div className="hidden md:flex gap-1 font-bold text-xs text-slate-400">
            {["الرئيسية", "خدماتنا", "الأحياء المخدومة", "اتصل بنا"].map((item, index) => {
              const href = index === 0 ? "/" : ["/services", "/areas", "/contact"][index - 1];
              return (
                <a key={item} href={href} className="px-5 py-2.5 rounded-xl hover:bg-slate-800/50 hover:text-white transition-all duration-300">
                  {item}
                </a>
              );
            })}
          </div>

          {/* زر الاتصال السريع */}
          <div className="hidden md:block">
            <a 
              href={`tel:${phoneNum}`}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-black hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all active:scale-[0.98]"
            >
              <Phone size={14} />
              <span dir="ltr">{phoneNum}</span>
            </a>
          </div>

          {/* زر الموبايل */}
          <button className="md:hidden text-white p-2 focus:outline-none bg-slate-900 rounded-xl border border-slate-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل الفاخرة */}
      {isOpen && (
        <div className="md:hidden bg-[#070D19]/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl absolute w-full left-0 z-40 animate-fadeIn">
          <div className="flex flex-col px-6 py-6 gap-2 font-bold text-sm text-slate-300">
            {["الرئيسية", "خدماتنا", "الأحياء المخدومة", "اتصل بنا"].map((item, index) => {
              const href = index === 0 ? "/" : ["/services", "/areas", "/contact"][index - 1];
              return (
                <a key={item} href={href} onClick={() => setIsOpen(false)} className="block hover:text-white p-4 rounded-xl hover:bg-slate-800/50 transition-all">
                  {item}
                </a>
              );
            })}
            <a href={`tel:${phoneNum}`} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-4 rounded-2xl font-black mt-3 text-base shadow-lg shadow-blue-600/20 active:scale-[0.98]">
              <Phone size={18} />
              <span dir="ltr">{phoneNum}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}