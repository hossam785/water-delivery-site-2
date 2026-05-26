export const dynamic = "force-dynamic";
export const revalidate = 0;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import FloatingWhatsApp from "@/components/FloatingWhatsApp"; 
import "./globals.css"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      {/* تم تحويل الـ body إلى اللون الداكن الملوكي المتناسق مع هوية الموقع الجديدة */}
      <body className="antialiased bg-[#050B14] text-slate-300 min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white overflow-x-hidden">
        
        {/* الهيدر العلوي / الـ Navbar */}
        <Navbar />
        
        {/* محتوى الصفحات الديناميكي */}
        <div className="flex-1 w-full">
          {children}
        </div>

        {/* زر الواتساب العائم التفاعلي للموبايل والكمبيوتر */}
        <FloatingWhatsApp />
        
        {/* الفوتر السفلي للموقع */}
        <Footer />
        
      </body>
    </html>
  );
}