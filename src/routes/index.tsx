import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {

  return (
    <div>
      <h1>Hello Landa</h1>
    </div>
  )
}
