import { createFileRoute, notFound } from '@tanstack/react-router'
import { useLoaderData } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { env } from "cloudflare:workers"
import type { Project } from '../../lib/types/types'

const getProject = createServerFn()
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const project: Project | null = await env.db.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first();

    if (!project) {
      throw notFound();
    }

    return project
  })

export const Route = createFileRoute('/projects/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const project: Project = await getProject({ data: params.id });
    return { project }
  }
})

function RouteComponent() {

  const { project } = useLoaderData({ from: Route.id });

  return <div>
    <h1>{project.designer}</h1>
  </div>
}
