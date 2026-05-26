"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { 
  LayoutDashboard, ClipboardList, Droplet, MapPin, LogOut, Trash2, 
  PlusCircle, Settings as SettingsIcon, Calendar, Newspaper, X, Upload, Eye, Menu, ShieldCheck, Image as ImageIcon, Loader2
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [requests, setRequests] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]); 
  const [totalVisitors, setTotalVisitors] = useState(0);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [postFile, setPostFile] = useState<File | null>(null);
  const [serviceFile, setServiceFile] = useState<File | null>(null);

  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [newArea, setNewArea] = useState({ area_name: "", description: "" });
  const [newService, setNewService] = useState({ title: "", description: "" });

  const [siteNameInput, setSiteNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [mapIframeInput, setMapIframeInput] = useState("");
  
  const [recordId, setRecordId] = useState<number | null>(null);

  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingPhone, setIsSavingPhone] = useState(false);
  const [isSavingMap, setIsSavingMap] = useState(false);

  const stats = {
    totalRequests: requests.length,
    totalServices: services.length,
    totalAreas: areas.length,
    totalPosts: posts.length,
    visitors: totalVisitors
  };

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const [reqRes, srvRes, areaRes, postsRes, visitorsRes, settingsRes] = await Promise.all([
        supabase.from("contact_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("services").select("*").order("id"),
        supabase.from("areas").select("*").order("id"),
        supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
        supabase.from("page_views").select('*', { count: 'exact', head: true }),
        supabase.from("settings").select("*").order("id", { ascending: true }).limit(1).maybeSingle()
      ]);

      if (reqRes.data) setRequests(reqRes.data);
      if (srvRes.data) setServices(srvRes.data);
      if (areaRes.data) setAreas(areaRes.data);
      if (postsRes.data) setPosts(postsRes.data);
      if (!visitorsRes.error && visitorsRes.count !== null) {
        setTotalVisitors(visitorsRes.count);
      }
      
      if (settingsRes.data) {
        setRecordId(settingsRes.data.id);
        setSiteNameInput(settingsRes.data.site_name || "");
        setPhoneInput(settingsRes.data.phone || "");
        setMapIframeInput(settingsRes.data.map_iframe || "");
      }
      
      setLoading(false);
    };

    checkUserAndFetchData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const deleteRequest = async (id: number) => {
    if(confirm("⚠️ هل أنت متأكد من حذف هذا الطلب نهائياً؟")) {
      const { error } = await supabase.from("contact_requests").delete().eq("id", id);
      if (error) alert("❌ خطأ: " + error.message);
      else setRequests(requests.filter(r => r.id !== id));
    }
  };

  const deleteService = async (id: number) => {
    if(confirm("⚠️ هل أنت متأكد من حذف هذه الخدمة؟")) {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) alert("❌ خطأ: " + error.message);
      else setServices(services.filter(s => s.id !== id));
    }
  };

  const deleteArea = async (id: number) => {
    if(confirm("⚠️ هل أنت متأكد من حذف هذا الحي؟")) {
      const { error } = await supabase.from("areas").delete().eq("id", id);
      if (error) alert("❌ خطأ: " + error.message);
      else setAreas(areas.filter(a => a.id !== id));
    }
  };

  const deletePost = async (id: number) => {
    if(confirm("⚠️ هل أنت متأكد من حذف هذا المنشور؟")) {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) alert("❌ خطأ: " + error.message);
      else setPosts(posts.filter(p => p.id !== id));
    }
  };

  const updateSiteName = async () => {
    setIsSavingName(true);
    let error;
    if (recordId) {
      const res = await supabase.from("settings").update({ site_name: siteNameInput }).eq("id", recordId);
      error = res.error;
    } else {
      const res = await supabase.from("settings").insert([{ site_name: siteNameInput }]).select();
      error = res.error;
      if (!error && res.data && res.data[0]) setRecordId(res.data[0].id);
    }
    if (error) alert("❌ خطأ أثناء حفظ الاسم: " + error.message);
    else alert("✅ تم تحديث اسم الموقع بنجاح!");
    setIsSavingName(false);
  };

  const updatePhone = async () => {
    if (!phoneInput.toString().trim()) {
      alert("⚠️ رجاءً اكتب رقم الهاتف أولاً");
      return;
    }
    setIsSavingPhone(true);
    const cleanPhone = phoneInput.toString().replace(/\s+/g, '');
    const whatsappFormed = `966${cleanPhone.replace(/^0/, '')}`;
    let error;
    if (recordId) {
      const res = await supabase.from("settings").update({ phone: cleanPhone, whatsapp: whatsappFormed }).eq("id", recordId);
      error = res.error;
    } else {
      const res = await supabase.from("settings").insert([{ phone: cleanPhone, whatsapp: whatsappFormed }]).select();
      error = res.error;
      if (!error && res.data && res.data[0]) setRecordId(res.data[0].id);
    }
    if (error) alert("❌ خطأ أثناء حفظ الهاتف: " + error.message);
    else alert("✅ عظيم! تم حفظ وتحديث الأرقام بنجاح داخل الداتا بيز.");
    setIsSavingPhone(false);
  };

  const updateMap = async () => {
    setIsSavingMap(true);
    let error;
    if (recordId) {
      const res = await supabase.from("settings").update({ map_iframe: mapIframeInput }).eq("id", recordId);
      error = res.error;
    } else {
      const res = await supabase.from("settings").insert([{ map_iframe: mapIframeInput }]).select();
      error = res.error;
      if (!error && res.data && res.data[0]) setRecordId(res.data[0].id);
    }
    if (error) alert("❌ خطأ أثناء حفظ الخريطة: " + error.message);
    else alert("✅ تم تحديث موقع الخريطة بنجاح!");
    setIsSavingMap(false);
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from("blog-images").upload(fileName, file);
    if (error) throw new Error("خطأ أثناء رفع الملف");
    const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (postFile) imageUrl = await uploadImageToStorage(postFile);
      const cleanSlug = newPost.title.trim().replace(/[\s\W\._]+/g, '-').replace(/^-+|-+$/g, '');
      const { data, error } = await supabase.from("blog_posts").insert([{ 
        title: newPost.title, slug: cleanSlug || Date.now().toString(), content: newPost.content, featured_image: imageUrl, seo_title: newPost.title, seo_description: newPost.content.substring(0, 150)
      }]).select();
      if (!error && data) {
        setPosts([data[0], ...posts]);
        setIsPostModalOpen(false);
        setNewPost({ title: "", content: "" });
        setPostFile(null);
      }
    } catch (err: any) { alert(err.message); } finally { setIsSubmitting(false); }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (serviceFile) imageUrl = await uploadImageToStorage(serviceFile);
      
      const autoSlug = newService.title.trim().replace(/[\s\W\._]+/g, '-').replace(/^-+|-+$/g, '');
      
      const { data, error } = await supabase.from("services").insert([{ 
        title: newService.title, 
        slug: autoSlug || Date.now().toString(), 
        description: newService.description, 
        image: imageUrl 
      }]).select();
      
      if (!error && data) {
        setServices([...services, data[0]]);
        setIsServiceModalOpen(false);
        setNewService({ title: "", description: "" });
        setServiceFile(null);
      }
    } catch (err: any) { alert(err.message); } finally { setIsSubmitting(false); }
  };

  const handleAddArea = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const autoSlug = newArea.area_name.trim().replace(/[\s\W\._]+/g, '-').replace(/^-+|-+$/g, '');
    
    const { data, error } = await supabase.from("areas").insert([{ 
      area_name: newArea.area_name, 
      slug: autoSlug || Date.now().toString(), 
      description: newArea.description 
    }]).select();
    
    if (!error && data) {
      setAreas([...areas, data[0]]);
      setIsAreaModalOpen(false);
      setNewArea({ area_name: "", description: "" });
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050B14] to-[#0A1120] flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <h2 className="font-black text-slate-200 text-xl mt-6 tracking-wide">جاري فحص الصلاحيات الأمنية...</h2>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#060B13] text-slate-300 flex flex-col md:flex-row font-sans relative overflow-x-hidden">
      
      {/* هيدر الموبايل المطور التفاعلي */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-[#090E1A]/90 backdrop-blur-md text-white flex items-center justify-between px-5 z-40 border-b border-slate-800/60 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-black text-sm tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">لوحة الإدارة الحية</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 active:scale-95 transition-all">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* خلفية تظليل عند فتح القائمة بالموبايل */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" />
      )}

      {/* القائمة الجانبية الفاخرة (Sidebar) المتوافقة كلياً */}
      <aside className={`fixed inset-y-0 right-0 w-[280px] bg-[#090E1A] border-l border-slate-800/80 text-slate-300 flex flex-col p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] h-screen z-50 transition-transform duration-300 ease-out md:sticky md:top-0 md:translate-x-0 pt-20 md:pt-6 ${isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-md font-black text-white tracking-wide">التحكم الفوري</h1>
              <p className="text-[10px] font-bold text-slate-500 mt-0.5">V1.0.0 Pro Live</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800"><X size={16} /></button>
        </div>
        
        <nav className="space-y-2 flex-1 overflow-y-auto pr-1">
          {[
            { id: "overview", label: "🧬 لوحة الإحصائيات" },
            { id: "requests", label: "📩 طلبات الاتصال", badge: stats.totalRequests },
            { id: "services", label: "💧 إدارة الخدمات" },
            { id: "areas", label: "📍 الأحياء والمناطق" },
            { id: "posts", label: "📰 مقالات الـ SEO" },
            { id: "settings", label: "⚙️ إعدادات الهوية" }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all duration-200 ${activeTab === tab.id ? "bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)] scale-[1.02]" : "hover:bg-slate-900/60 text-slate-400 hover:text-slate-200"}`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-md shadow-red-500/20 animate-pulse">{tab.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-red-950/20 hover:bg-red-900/40 border border-red-900/40 hover:border-red-500/40 text-red-400 text-xs font-bold transition-all duration-200">
          <LogOut size={14}/> تسجيل خروج آمن
        </button>
      </aside>

      {/* المحتوى الرئيسي الفاخر */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 lg:p-12 overflow-x-hidden mt-14 md:mt-0 bg-[#060B13]">
        
        {/* شاشة الإحصائيات العامة */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-black text-white tracking-wide border-r-4 border-blue-500 pr-3">نظرة عامة على النظام الحركي</h2>
            <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "الزيارات الكلية", val: stats.visitors, color: "from-blue-600/10 to-sky-600/5", text: "text-blue-400", border: "border-blue-500/20" },
                { label: "الطلبات الواردة", val: stats.totalRequests, color: "from-amber-600/10 to-orange-600/5", text: "text-amber-400", border: "border-amber-500/20" },
                { label: "الخدمات النشطة", val: stats.totalServices, color: "from-emerald-600/10 to-teal-600/5", text: "text-emerald-400", border: "border-emerald-500/20" },
                { label: "الأحياء المغطاة", val: stats.totalAreas, color: "from-indigo-600/10 to-purple-600/5", text: "text-indigo-400", border: "border-indigo-500/20" },
                { label: "المقالات والمنشورات", val: stats.totalPosts, color: "from-pink-600/10 to-rose-600/5", text: "text-pink-400", border: "border-pink-500/20" },
              ].map((c, i) => (
                <div key={i} className={`bg-gradient-to-br ${c.color} p-5 rounded-2xl border ${c.border} shadow-lg backdrop-blur-sm relative overflow-hidden group`}>
                  <h3 className={`text-2xl sm:text-3xl font-black ${c.text} tracking-tight`}>{c.val}</h3>
                  <p className="text-slate-400 font-bold text-[11px] mt-1">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* شاشة الطلبات */}
        {activeTab === "requests" && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-black text-white tracking-wide border-r-4 border-blue-500 pr-3">📩 طلبات الاتصال الواردة للمبيعات</h2>
            <div className="bg-[#090E1A] rounded-2xl border border-slate-800/60 shadow-2xl overflow-hidden">
              {requests.length === 0 ? (
                <p className="p-12 text-center text-slate-500 font-bold text-xs">لا توجد طلبات واردة من المستخدمين حتى الآن.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-[#0D1424] border-b border-slate-800/80 text-slate-400 font-black text-xs tracking-wide">
                      <tr>
                        <th className="p-4">الاسم</th>
                        <th className="p-4">الهاتف</th>
                        <th className="p-4">الحي</th>
                        <th className="p-4">نوع الخدمة</th>
                        <th className="p-4">التاريخ</th>
                        <th className="p-4 text-center">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-slate-300 font-semibold text-xs">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-4 font-black text-white">{req.name}</td>
                          <td className="p-4 font-mono tracking-wide text-slate-400" dir="ltr">{req.phone}</td>
                          <td className="p-4">{req.area || "—"}</td>
                          <td className="p-4"><span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black border border-blue-500/20">{req.service || "وايت مياه"}</span></td>
                          <td className="p-4 text-[10px] text-slate-500">{new Date(req.created_at).toLocaleDateString("ar-EG")}</td>
                          <td className="p-4 text-center">
                            <button onClick={() => deleteRequest(req.id)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-xl transition-all"><Trash2 size={15}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* شاشة الخدمات */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-black text-white tracking-wide border-r-4 border-blue-500 pr-3">💧 إدارة باقات وخدمات التوصيل</h2>
              <button onClick={() => setIsServiceModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-black flex items-center gap-2 text-xs shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"><PlusCircle size={15}/>إنشاء باقة خدمة جديدة</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="bg-[#090E1A] rounded-2xl border border-slate-800/80 p-5 shadow-xl flex flex-col justify-between group">
                  <div>
                    {srv.image ? (
                      <img src={srv.image} alt="" className="w-full h-40 object-cover rounded-xl mb-4 bg-slate-900 border border-slate-800/40" />
                    ) : (
                      <div className="w-full h-40 rounded-xl mb-4 bg-slate-900 border border-slate-800/40 flex items-center justify-center text-slate-600"><ImageIcon size={30}/></div>
                    )}
                    <h3 className="font-black text-base text-white mb-2">{srv.title}</h3>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed line-clamp-3 mb-4">{srv.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-800/60">
                    <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg font-bold text-slate-500">/{srv.slug}</span>
                    <button onClick={() => deleteService(srv.id)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-xl transition-all"><Trash2 size={15}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* شاشة الأحياء والمناطق */}
        {activeTab === "areas" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-black text-white tracking-wide border-r-4 border-blue-500 pr-3">📍 إدارة الأحياء والنطاق الجغرافي</h2>
              <button onClick={() => setIsAreaModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-black flex items-center gap-2 text-xs shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"><PlusCircle size={15}/>إضافة حي سكني جديد</button>
            </div>
            <div className="bg-[#090E1A] rounded-2xl border border-slate-800/60 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead className="bg-[#0D1424] border-b border-slate-800/80 text-slate-400 font-black text-xs tracking-wide">
                    <tr>
                      <th className="p-4">اسم الحي / المنطقة السكنية</th>
                      <th className="p-4">الرابط الفرعي (Slug)</th>
                      <th className="p-4">الوصف المختصر الموجه لـ Google</th>
                      <th className="p-4 text-center">حذف</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300 font-semibold text-xs">
                    {areas.map((area) => (
                      <tr key={area.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-black text-white">{area.area_name}</td>
                        <td className="p-4 font-mono text-[11px] text-blue-400">{area.slug}</td>
                        <td className="p-4 text-slate-400 max-w-xs truncate">{area.description || "—"}</td>
                        <td className="p-4 text-center">
                          <button onClick={() => deleteArea(area.id)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-xl transition-all"><Trash2 size={15}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* شاشة المقالات والمدونة */}
        {activeTab === "posts" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-black text-white tracking-wide border-r-4 border-blue-500 pr-3">📰 منشورات ومقالات مدونة الـ SEO</h2>
              <button onClick={() => setIsPostModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-black flex items-center gap-2 text-xs shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"><PlusCircle size={15}/>صناعة مقال حصري جديد</button>
            </div>
            <div className="bg-[#090E1A] rounded-2xl border border-slate-800/60 shadow-2xl divide-y divide-slate-800/40">
              {posts.map((post) => (
                <div key={post.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4">
                    {post.featured_image ? (
                      <img src={post.featured_image} alt="" className="w-14 h-14 object-cover rounded-xl bg-slate-900 border border-slate-800/40" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800/40 flex items-center justify-center text-slate-600"><ImageIcon size={18}/></div>
                    )}
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{post.title}</h3>
                      <p className="text-[10px] text-slate-500 font-mono">المسار الثابت للمقال: /blog/{post.slug}</p>
                    </div>
                  </div>
                  <button onClick={() => deletePost(post.id)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-xl transition-all self-end sm:self-center"><Trash2 size={15}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* شاشة الإعدادات */}
        {activeTab === "settings" && (
          <div className="bg-[#090E1A] rounded-2xl border border-slate-800/80 p-6 md:p-8 space-y-6 max-w-2xl shadow-2xl animate-fadeIn">
            <h2 className="text-base font-black text-white border-b border-slate-800/60 pb-3 tracking-wide flex items-center gap-2"><SettingsIcon size={16} className="text-blue-500"/>إعدادات هوية واتصال المنصة الأساسية</h2>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="block font-black text-xs text-slate-400 pr-1">اسم الموقع الاستراتيجي</label>
                <div className="flex gap-2">
                  <input type="text" value={siteNameInput} onChange={(e) => setSiteNameInput(e.target.value)} className="flex-1 bg-[#060B13] border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-200 outline-none focus:border-blue-500 transition-all" />
                  <button onClick={updateSiteName} disabled={isSavingName} className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white px-5 rounded-xl font-black text-xs transition-all active:scale-95">{isSavingName ? "جاري..." : "حفظ المعطى"}</button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block font-black text-xs text-slate-400 pr-1">رقم الاتصال المباشر (صافي جوال السائق)</label>
                <div className="flex gap-2">
                  <input type="text" dir="ltr" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} className="flex-1 bg-[#060B13] border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-left text-slate-200 outline-none focus:border-blue-500 transition-all" />
                  <button onClick={updatePhone} disabled={isSavingPhone} className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white px-5 rounded-xl font-black text-xs transition-all active:scale-95">{isSavingPhone ? "جاري..." : "حفظ الرقم"}</button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block font-black text-xs text-slate-400 pr-1">رابط خرائط جوجل المباشر (iframe src)</label>
                <textarea rows={3} value={mapIframeInput} onChange={(e) => setMapIframeInput(e.target.value)} className="w-full bg-[#060B13] border border-slate-800 rounded-xl p-4 text-xs font-mono text-left text-slate-200 leading-relaxed outline-none focus:border-blue-500 transition-all resize-none" />
                <button onClick={updateMap} disabled={isSavingMap} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-5 py-3 rounded-xl font-black text-xs transition-all active:scale-[0.99] w-full shadow-lg shadow-blue-600/10">{isSavingMap ? "جاري تثبيت الخريطة الحية..." : "حفظ وتثبيت الخريطة التفاعلية للموقع"}</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* موديول إضافة خدمة التوصيل */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#090E1A] border border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-white">إضافة باقة خدمة توصيل جديدة</h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-900 border border-slate-800/60 rounded-xl"><X size={16}/></button>
            </div>
            <form onSubmit={handleAddService} className="space-y-4">
              <div className="space-y-1"><label className="block text-xs font-black text-slate-400 pr-1">اسم باقة الخدمة</label><input type="text" required value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="w-full bg-[#060B13] border border-slate-800 p-3 rounded-xl outline-none text-xs font-bold text-slate-200 focus:border-blue-500 transition-all"/></div>
              <div className="space-y-1"><label className="block text-xs font-black text-slate-400 pr-1">شرح وتفاصيل الخدمة الموجهة للعميل</label><textarea rows={4} required value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="w-full bg-[#060B13] border border-slate-800 p-3 rounded-xl outline-none text-xs font-semibold text-slate-300 leading-relaxed transition-all resize-none"/></div>
              
              <div className="space-y-1">
                <label className="block text-xs font-black text-slate-400 pr-1">أيقونة أو صورة تعبيرية</label>
                <label className="group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-[#060B13] rounded-2xl cursor-pointer hover:bg-slate-900/40 transition-all p-4 text-center relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload size={20} className="text-slate-500 group-hover:text-blue-400 transition-transform" />
                    <p className="text-[11px] font-bold text-slate-400">
                      {serviceFile ? `✅ جاهز: ${serviceFile.name.substring(0,20)}...` : "اضغط لرفع صورة فنية معبرة"}
                    </p>
                  </div>
                  <input type="file" accept="image/*" onChange={e => setServiceFile(e.target.files ? e.target.files[0] : null)} className="hidden"/>
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-black text-xs transition-colors shadow-lg shadow-blue-500/10">{isSubmitting ? "جاري تشفير ومعالجة الرفع..." : "تأكيد إطلاق الخدمة على المنصة"}</button>
            </form>
          </div>
        </div>
      )}

      {/* موديول إضافة حي جديد */}
      {isAreaModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#090E1A] border border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-white">إضافة نطاق جغرافي / حي مخدوم</h3>
              <button onClick={() => setIsAreaModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-900 border border-slate-800/60 rounded-xl"><X size={16}/></button>
            </div>
            <form onSubmit={handleAddArea} className="space-y-4">
              <div className="space-y-1"><label className="block text-xs font-black text-slate-400 pr-1">اسم الحي السكني (بالعربية)</label><input type="text" required value={newArea.area_name} onChange={e => setNewArea({...newArea, area_name: e.target.value})} placeholder="مثال: حي الصحافة" className="w-full bg-[#060B13] border border-slate-800 p-3 rounded-xl outline-none text-xs font-bold text-slate-200 focus:border-blue-500 transition-all"/></div>
              <div className="space-y-1"><label className="block text-xs font-black text-slate-400 pr-1">نبذة عن قوة وتغطية الحي للـ SEO</label><textarea rows={3} value={newArea.description} onChange={e => setNewArea({...newArea, description: e.target.value})} placeholder="اكتب كلمات مفتاحية يستهدفها جوجل..." className="w-full bg-[#060B13] border border-slate-800 p-3 rounded-xl outline-none text-xs font-medium text-slate-300 transition-all resize-none"/></div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-black text-xs shadow-lg shadow-blue-500/10">{isSubmitting ? "جاري التثبيت الهيكلي..." : "تأكيد ربط وتغطية الحي"}</button>
            </form>
          </div>
        </div>
      )}

      {/* موديول إضافة مقال SEO */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#090E1A] border border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-white">تحرير وصناعة مقال SEO مستهدف</h3>
              <button onClick={() => setIsPostModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-900 border border-slate-800/60 rounded-xl"><X size={16}/></button>
            </div>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div className="space-y-1"><label className="block text-xs font-black text-slate-400 pr-1">عنوان المقال المستهدف كلياً للبحث</label><input type="text" required value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} placeholder="مثال: أسعار وايتات مياه الشرب شمال الرياض" className="w-full bg-[#060B13] border border-slate-800 p-3 rounded-xl outline-none text-xs font-bold text-slate-200 focus:border-blue-500 transition-all"/></div>
              <div className="space-y-1"><label className="block text-xs font-black text-slate-400 pr-1">صلب ومحتوى المقال الكامل</label><textarea rows={7} required value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} className="w-full bg-[#060B13] border border-slate-800 p-3 rounded-xl outline-none text-xs font-semibold text-slate-300 leading-relaxed transition-all resize-none"/></div>
              
              <div className="space-y-1">
                <label className="block text-xs font-black text-slate-400 pr-1">الصورة البارزة للتدوينة</label>
                <label className="group flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-[#060B13] rounded-2xl cursor-pointer hover:bg-slate-900/40 transition-all p-4 text-center">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Upload size={18} className="text-slate-500 group-hover:text-blue-400 transition-transform" />
                    <p className="text-[11px] font-bold text-slate-400">
                      {postFile ? `✅ تم الاختيار: ${postFile.name.substring(0,25)}...` : "اضغط هنا لرفع الغلاف التعبيري"}
                    </p>
                  </div>
                  <input type="file" accept="image/*" onChange={e => setPostFile(e.target.files ? e.target.files[0] : null)} className="hidden"/>
                </label>
              </div>

              <input type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-black text-xs transition-all cursor-pointer shadow-lg shadow-blue-500/10" value={isSubmitting ? "جاري أتمتة الرفع وجدولة النشر لايف..." : "إطلاق ونشر المقال فوراً للمستخدمين"} />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}