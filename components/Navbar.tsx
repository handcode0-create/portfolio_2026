"use client";
import {Menu,ArrowUpRight} from "lucide-react";
import {useState} from "react";
const links=[["Projets","#projets"],["À propos","#a-propos"],["Contact","#contact"]];
export function Navbar(){
 const[open,setOpen]=useState(false);
 return <header className="fixed inset-x-0 top-0 z-50"><div className="container-page pt-4"><nav className="glass flex h-14 items-center justify-between rounded-2xl px-4 md:h-16 md:px-5">
 <a href="#" className="flex items-center gap-2 font-bold tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-xl bg-orange text-sm font-black text-black">H</span>HANCODE</a>
 <div className="hidden items-center gap-7 text-sm text-white/65 md:flex">{links.map(([label,href])=><a key={href} href={href} className="transition hover:text-white">{label}</a>)}</div>
 <a href="#contact" className="hidden items-center gap-1 rounded-xl bg-orange px-4 py-2 text-sm font-bold text-black md:flex">Me contacter <ArrowUpRight size={15}/></a>
 <button aria-label="Ouvrir le menu" onClick={()=>setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 md:hidden"><Menu size={19}/></button>
 </nav>{open&&<div className="glass mt-2 rounded-2xl p-2 md:hidden">{links.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/5">{label}</a>)}</div>}</div></header>
}