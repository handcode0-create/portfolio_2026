import {ArrowLeft,ArrowUpRight,CheckCircle2,Code2} from "lucide-react";
import {notFound} from "next/navigation";
import {projects} from "@/data/projects";

export function generateStaticParams(){return projects.map(project=>({slug:project.slug}));}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const project=projects.find(item=>item.slug===slug);
 if(!project) notFound();

 return <main className="min-h-screen overflow-hidden">
  <header className="container-page flex items-center justify-between py-5">
   <a href="/#projets" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"><ArrowLeft size={16}/>Tous les projets</a>
   <span className="text-sm font-bold tracking-tight">HANCODE</span>
  </header>

  <section className="container-page py-12 md:py-20">
   <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
    <div>
     <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-xs text-white/55">{project.category}</div>
     <h1 className="text-5xl font-bold tracking-[-.04em] md:text-7xl">{project.name}</h1>
     <p className="mt-6 max-w-xl text-base leading-7 text-white/55 md:text-lg">{project.description}</p>
     <div className="mt-7 flex flex-wrap gap-2">{project.stack.map(tech=><span key={tech} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">{tech}</span>)}</div>
     <div className="mt-8 flex flex-wrap gap-3"><a href="#aperçu" className="inline-flex items-center gap-2 rounded-2xl bg-orange px-5 py-3.5 text-sm font-bold text-black">Explorer le projet <ArrowUpRight size={16}/></a></div>
    </div>
    <div className="orange-gradient relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 p-4 md:p-7">
     <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/50 backdrop-blur">
      <div className="w-[72%] rounded-2xl border border-white/10 bg-[#151515] p-4 shadow-glow">
       <div className="h-3 w-1/3 rounded-full bg-white/10"/>
       <div className="mt-4 h-24 rounded-xl" style={{background:"linear-gradient(135deg, "+project.accent+"66, transparent)"}}/>
       <div className="mt-4 grid grid-cols-3 gap-2"><span className="h-16 rounded-lg bg-white/[.05]"/><span className="h-16 rounded-lg bg-white/[.05]"/><span className="h-16 rounded-lg bg-white/[.05]"/></div>
      </div>
     </div>
    </div>
   </div>
  </section>

  <section id="aperçu" className="container-page scroll-mt-8 border-t border-white/10 py-16 md:py-24">
   <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
    <div><div className="text-xs font-bold uppercase tracking-[.2em] text-orange">Aperçu du projet</div><h2 className="mt-3 text-3xl font-bold md:text-4xl">L'expérience, écran par écran.</h2></div>
    <div>
     <p className="text-white/55 leading-7">Cette page est préparée pour recevoir les captures réelles de l'application. Elles remplaceront les placeholders sans modifier la structure UI.</p>
     <div className="mt-8 grid gap-4 md:grid-cols-2">
      {[1,2,3,4].map(index=><div key={index} className="flex aspect-[16/10] items-center justify-center rounded-3xl border border-white/10 bg-[#101010] text-xs text-white/25"><Code2 size={16} className="mr-2"/>Screenshot {index}</div>)}
     </div>
    </div>
   </div>
  </section>

  <section className="container-page border-t border-white/10 py-16 md:py-24">
   <div className="grid gap-5 md:grid-cols-3">
    {["Produit","UX / UI","Technologie"].map((title,index)=><div key={title} className="rounded-3xl border border-white/10 bg-white/[.02] p-6"><CheckCircle2 size={18} className="text-orange"/><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/45">{index===0?"Conception orientée besoins réels et usages locaux.":index===1?"Interface claire, responsive et pensée mobile-first.":"Architecture moderne avec une stack adaptée au produit."}</p></div>)}
   </div>
  </section>

  <footer className="container-page border-t border-white/10 py-8 text-xs text-white/35">© 2026 HANCODE</footer>
 </main>
}