import { Link } from '@tanstack/react-router'
import type { Project } from 'lib/types/types'
import React from 'react'

type Props = {
    project: Project
}

export default function ProjectCard({ project }: Props) {
    return (
        <Link to="/projects/$id" params={{ id: project.id.toString() }}>
            <img src={project.thumbnail} alt="" className="rounded-md" />
        </Link>
    )
}
