// src/app/pages/[id].js
'use client';
import { Landing } from "@/components/landing";

export default function Page({ params }) {
  const copiedParams = { ...params }
  return <div>
      <Landing props={copiedParams} />
    </div>
}
