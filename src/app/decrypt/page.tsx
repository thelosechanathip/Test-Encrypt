"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { decrypt } from "@/lib/crypto";

export default function DecryptPage() {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    const encrypted = "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"

    // ฟังก์ชัน Copy to Clipboard
    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Copy failed:", err);
            }
        }
    };

    useEffect(() => {
        setMounted(true);
        async function doDecrypt() {
            try {
                setLoading(true);
                const decrypted = await decrypt(encrypted);
                setResult(decrypted);
                setError(null);
            } catch (err) {
                console.error("Decrypt failed:", err);
                setError("ไม่สามารถถอดรหัสได้");
            } finally {
                setLoading(false);
            }
        }
        doDecrypt();
    }, []);

    // ป้องกัน Hydration Error
    if (!mounted) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4 md:p-8" suppressHydrationWarning>
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <Link 
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl 
                                  border border-white/20 text-white hover:bg-white/20 transition-all group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>กลับหน้าแรก</span>
                    </Link>
                </div>

                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                    {/* Card Header */}
                    <div className="p-6 md:p-8 border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 
                                          flex items-center justify-center shadow-lg shadow-orange-500/30">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">ถอดรหัสข้อมูล</h1>
                                <p className="text-gray-400 text-sm mt-1">Decrypt Data Tool</p>
                            </div>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 md:p-8">
                        {loading ? (
                            // Loading State
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 
                                              rounded-full animate-spin mb-4" />
                                <p className="text-gray-400">กำลังถอดรหัสข้อมูล...</p>
                            </div>
                        ) : error ? (
                            // Error State
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">เกิดข้อผิดพลาด</h3>
                                <p className="text-gray-400">{error}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="mt-4 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition"
                                >
                                    ลองใหม่อีกครั้ง
                                </button>
                            </div>
                        ) : result ? (
                            // Success State
                            <div className="space-y-6">
                                {/* Action Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <h2 className="text-lg font-semibold text-white">Decrypted Result</h2>
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2
                                                    ${copied 
                                                        ? 'bg-emerald-500 text-white' 
                                                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                                    }`}
                                    >
                                        {copied ? (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                คัดลอกแล้ว!
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Decrypted JSON Display */}
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 
                                                  rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <pre className="relative bg-slate-900/80 p-4 md:p-6 rounded-2xl overflow-x-auto 
                                                  text-xs md:text-sm break-all whitespace-pre-wrap font-mono text-emerald-300 
                                                  border border-white/10 max-h-96 overflow-y-auto">
                                        {JSON.stringify(JSON.parse(result), null, 2)}
                                    </pre>
                                </div>

                                {/* Raw Result Display */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Raw Result</h3>
                                    <div className="relative">
                                        <pre className="bg-slate-800/50 p-4 md:p-6 rounded-2xl overflow-x-auto 
                                                      text-xs md:text-sm whitespace-pre-wrap font-mono text-blue-300 
                                                      border border-white/10 max-h-32 overflow-y-auto">
                                            {result}
                                        </pre>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="flex items-start gap-3 p-4 bg-indigo-500/10 border border-indigo-400/30 
                                              rounded-xl text-indigo-200 text-sm">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p>ข้อมูลถูกถอดรหัสสำเร็จ ตรวจสอบความถูกต้องก่อนใช้งานต่อ</p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6" suppressHydrationWarning>
                    🔓 Decrypted with AES-256
                </p>
            </div>
        </main>
    );
}