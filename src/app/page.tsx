"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/encrypt">Encrypt</Link>
      <br />
      <Link href="/decrypt">Decrypt</Link>
    </>
  )
}