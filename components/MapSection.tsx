"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function MapSection() {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const fetchMapSrc = async () => {
      const { data: settings } = await supabase
        .from("settings")
        .select("map_iframe")
        .limit(1)
        .maybeSingle();

      if (settings?.map_iframe) {
        setMapUrl(settings.map_iframe);
      }
    };
    fetchMapSrc();
  }, []);

  if (!mapUrl) return null;

  return (
    <section className="w-full h-96 md:h-[500px] relative border-t border-slate-800/50 bg-[#070D19]">
      {/* تأثير تدرج علوي لدمج الخريطة مع باقي التصميم */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050B14] to-transparent z-10 pointer-events-none" />
      
      <iframe
        src={mapUrl}
        className="w-full h-full border-0 grayscale-[80%] hover:grayscale-0 transition-all duration-1000"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="موقعنا على الخريطة"
      ></iframe>
    </section>
  );
}