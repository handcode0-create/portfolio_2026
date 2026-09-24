import {ArrowDown,ArrowUpRight,Code2,Smartphone,Sparkles} from "lucide-react";
export function Hero(){
 return <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-24">
  <div className="absolute inset-0 bg-[url('/portfolio-bg/hero.webp')] bg-cover bg-center opacity-35"/>
  <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/85 to-[#0B0B0B]/35"/>
  <div className="absolute inset-0 noise opacity-40"/><div className="pulse-glow absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-orange/10 blur-[100px]"/>
  <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:py-24">
   <div><div className="reveal inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.14em] text-orange"><Sparkles size={13}/>Développeur full-stack</div>
    <h1 className="reveal reveal-delay-1 mt-6 max-w-4xl text-[clamp(2.8rem,10vw,6.7rem)] font-bold leading-[.94] tracking-[-.055em]">Je conçois des <span className="text-orange">produits numériques</span> utiles.</h1>
    <p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-7 text-white/55 md:text-lg md:leading-8">Des applications web et mobiles modernes pour résoudre des problèmes réels en Côte d'Ivoire et au-delà.</p>
    <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row"><a href="#projets" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange px-5 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,106,0,.2)]">Voir mes projets <ArrowUpRight size={17}/></a><a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/5">Me contacter</a></div>
    <div className="reveal reveal-delay-4 mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md">{[["6+","Projets"],["100%","Passion"],["∞","Idées"]].map(([value,label])=><div key={label} className="px-3 py-4 text-center md:px-5"><div className="text-lg font-bold md:text-xl">{value}</div><div className="mt-1 text-[11px] text-white/45">{label}</div></div>)}</div>
   </div>
   <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[520px]"><div className="float-slow absolute inset-8 rounded-[3rem] bg-orange/10 blur-[70px]"/>
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0b]/70 shadow-glow">
     <img src="/portfolio-bg/devices.webp" alt="Composition digitale HANCODE" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 hover:scale-105" />
     <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/15"/>
     <div className="absolute left-8 top-8 flex items-center gap-2 text-xs text-white/60"><Code2 size={15} className="text-orange"/>DIGITAL PRODUCTS</div>
     <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-black/65 p-5 backdrop-blur-xl"><div className="text-xs text-orange">SELECTED WORK</div><div className="mt-2 text-2xl font-bold">Des idées transformées en produits.</div><div className="mt-4 flex items-center gap-2 text-xs text-white/45"><Smartphone size={14}/>Web · Mobile · SaaS</div></div>
    </div>
   </div>
  </div><a href="#projets" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-white/35 md:flex">Explorer <ArrowDown size={14}/></a>
 </section>
}