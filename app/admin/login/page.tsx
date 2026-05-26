"use client";

import { useState } from "react";
import { Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // إرسال البيانات لـ Supabase للتحقق من صحتها (ثابت بدون تعديل)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة!");
      setLoading(false);
    } else {
      // لو البيانات صحيحة، هيدخلك فوراً على لوحة التحكم
      router.push("/admin");
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#0A1120] to-[#03070E] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* عناصر ضوئية في الخلفية لإعطاء عمق فخم */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800/60 overflow-hidden group transition-all duration-500">
        
        {/* رأس الصفحة الفاخر (Header) */}
        <div className="p-8 pb-4 text-center relative border-b border-slate-800/40">
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-gradient-to-br from-blue-500/20 to-sky-500/5 p-4 rounded-2xl mb-4 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.2)] group-hover:scale-105 transition-transform duration-500">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              بوابة التحكم الرقمية
            </h1>
            <p className="text-slate-400 text-xs font-bold mt-1.5 tracking-normal">
              الدخول الآمن المخصص لمنسوبي الإدارة فقط
            </p>
          </div>
        </div>

        {/* نموذج تسجيل الدخول */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* رسالة الخطأ المصممة بنقاء */}
            {error && (
              <div className="bg-red-950/40 text-red-400 p-3.5 rounded-xl text-xs font-bold text-center border border-red-900/50 animate-fadeIn">
                ⚠️ {error}
              </div>
            )}

            {/* حقل البريد الإلكتروني */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-300 pr-1 tracking-wide">
                البريد الإلكتروني للمسؤول
              </label>
              <div className="relative group/input">
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#070D19]/80 border border-slate-800/80 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-left text-slate-200 text-sm font-semibold"
                  placeholder="admin@example.com"
                />
                <Mail className="absolute left-3.5 top-4 text-slate-500 w-5 h-5 group-focus-within/input:text-blue-400 transition-colors" />
              </div>
            </div>

            {/* حقل كلمة المرور */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-300 pr-1 tracking-wide">
                كلمة المرور المشفرة
              </label>
              <div className="relative group/input">
                <input
                  type="password"
                  required
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#070D19]/80 border border-slate-800/80 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-left text-slate-200 text-sm font-semibold tracking-widest placeholder:tracking-normal"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3.5 top-4 text-slate-500 w-5 h-5 group-focus-within/input:text-blue-400 transition-colors" />
              </div>
            </div>

            {/* زر الدخول المتوهج */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 disabled:from-blue-800 disabled:to-blue-900 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-200" />
                  <span>جاري التحقق من الصلاحيات...</span>
                </>
              ) : (
                <span>ولوج آمن للنظام</span>
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}