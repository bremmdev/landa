import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useLoaderData } from '@tanstack/react-router'
import { env } from "cloudflare:workers"
import type { Project } from '../../lib/types/types'
import { Link } from '@tanstack/react-router'
import TitleHeader from '../components/TitleHeader'

const getProjects = createServerFn().handler(async () => {
  const { results: projects }: D1Result<Project> = await env.db.prepare('SELECT * FROM projects order by startDate desc').run();
  return projects
})

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const projects = await getProjects();
    return { projects };
  }
})

function App() {

  const { projects } = useLoaderData({ from: Route.id });

  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <li key={project.id} className="flex flex-col gap-4">
            <TitleHeader name={project.name} owner={project.owner} />
            <Link to="/projects/$slug" params={{ slug: project.slug }} className="flex flex-col gap-4">
              <img src={project.imageUrl} alt={project.name} className="rounded-lg object-cover h-96 w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
