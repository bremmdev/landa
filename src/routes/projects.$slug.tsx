import { createFileRoute, notFound } from '@tanstack/react-router'
import { useLoaderData } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { env } from "cloudflare:workers"
import type { Project } from '../../lib/types/types'
import TitleHeader from '../components/TitleHeader'

const getProject = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const project: Project | null = await env.db.prepare('SELECT * FROM projects WHERE slug = ?').bind(slug).first();

    if (!project) {
      throw notFound();
    }

    return project
  })

export const Route = createFileRoute('/projects/$slug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const project: Project = await getProject({ data: params.slug });
    return { project }
  }
})

function RouteComponent() {

  const { project } = useLoaderData({ from: Route.id });

  return <section aria-label={project.name}>
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-4 lg:w-1/2">
        <TitleHeader name={project.name} owner={project.owner} />
        <img src={project.imageUrl} alt={project.name} className="rounded-lg object-cover w-full max-lg:max-h-[70vh]" />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-4 lg:pt-20 items-start self-start">
        <span className="font-medium">Start datum</span><span>{project.startDate}</span>
        <span className="font-medium">Eind datum</span><span>{project.endDate ?? "nog niet klaar"}</span>
        <span className="font-medium">Naaldgrootte</span><span>{project.needleSize ? project.needleSize : "onbekend"}</span>
        <span className="font-medium">Garen</span><span>{project.yarn}</span>
        <span className="font-medium">Steekverhouding</span><span>{project.castOn ? project.castOn : "onbekend"}</span>
        <span className="font-medium">Ontwerpster</span><span>{project.designer ? project.designer : "Eigen ontwerp"}</span>
      </div>
    </div>
  </section>
}
