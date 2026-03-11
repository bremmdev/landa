import { createFileRoute, notFound } from '@tanstack/react-router'
import { useLoaderData } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { env } from "cloudflare:workers"
import type { Project } from '../../lib/types/types'

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
    <div>
      <h1 className="text-2xl font-mediun uppercase text-mauve-950">{project.name}</h1>
    </div>
    <div className="flex flex-col lg:flex-row gap-4">
      <img src={project.imageUrl} alt={project.name} className="rounded-lg object-cover w-full lg:w-1/2" />
      <div className="flex flex-col gap-4 lg:w-1/2">
        <span>Start datum: {project.startDate}</span>
        <span>Eind datum: {project.endDate ?? "nog niet klaar"}</span>
        <span>Garen: {project.yarn}</span>
      </div>
    </div>
  </section>
}
