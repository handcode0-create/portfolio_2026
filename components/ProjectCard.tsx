import type {Project} from "@/data/projects";
import {ArrowUpRight} from "lucide-react";
export function ProjectCard({project}:{project:Project}){
 return <a href={"/projets/"+project.slug} className="group block overflow-hidden rounded-3xl border border-white/10 bg-[#101010] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_80px_rgba(0,0,0,.35)]">
  <div className="relative aspect-[16/10] overflow-hidden bg-[#090909]">
   <img src={project.image} alt={project.name+" — aperçu visuel"} style={{objectPosition:project.imagePosition||"center"}} className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-[1.045] group-hover:opacity-90"/>
   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
   <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_40%,rgba(255,106,0,.18),transparent_35%)]"/>
   <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[11px] text-white/70 backdrop-blur">{project.status}</span>
   <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] text-white/55 backdrop-blur">Voir le projet</span>
  </div>
  <div className="p-5 md:p-6"><div className="mb-2 text-xs font-semibold uppercase tracking-[.18em]" style={{color:project.accent}}>{project.category}</div><div className="flex items-start justify-between gap-4"><div><h3 className="text-xl font-bold">{project.name}</h3><p className="mt-2 max-w-md text-sm leading-6 text-white/55">{project.description}</p></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 transition duration-300 group-hover:border-orange group-hover:bg-orange group-hover:text-black"><ArrowUpRight size={17}/></span></div><div className="mt-5 flex flex-wrap gap-2">{project.stack.map(tech=><span key={tech} className="rounded-full bg-white/[.05] px-2.5 py-1 text-[11px] text-white/55">{tech}</span>)}</div></div>
 </a>
}