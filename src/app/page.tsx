"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ป้องกัน Hydration Error - render เหมือนกันทั้ง server และ client
  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 mb-4 shadow-lg shadow-purple-500/30">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Tool</h1>
          <p className="text-gray-400">เลือกฟังก์ชันที่ต้องการใช้งาน</p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-4">
          {/* Encrypt Card */}
          <Link 
            href="/encrypt"
            className="group block p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 
                      hover:bg-white/20 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 
                      transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 
                            flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
                  Encrypt
                </h3>
                <p className="text-sm text-gray-400">เข้ารหัสข้อมูลก่อนส่ง</p>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Decrypt Card */}
          <Link 
            href="/decrypt"
            className="group block p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 
                      hover:bg-white/20 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/20 
                      transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 
                            flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                  Decrypt
                </h3>
                <p className="text-sm text-gray-400">ถอดรหัสข้อมูลที่ได้รับ</p>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          🔐 Secure & Encrypted
        </p>
      </div>
    </main>
  );
}