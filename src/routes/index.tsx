import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useLoaderData } from '@tanstack/react-router'
import { env } from "cloudflare:workers"
import type { Project } from '../../lib/types/types'
import ProjectCard from '../components/ProjectCard'

const getProjects = createServerFn().handler(async () => {
  const projects: D1Result<Project> = await env.db.prepare('SELECT * FROM projects order by startDate desc').all()
  return projects.results
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
    <div>
      <h1>Hello Landa</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  )
}
