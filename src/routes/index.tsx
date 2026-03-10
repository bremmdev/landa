import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { env } from "cloudflare:workers"
import type { Project } from '../../lib/types/types'

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

  return (
    <div>
      <h1>Hello Landa</h1>
    </div>
  )
}
