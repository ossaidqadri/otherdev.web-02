import { projects } from '@/lib/projects'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return Response.json({ error: 'Project not found' }, { status: 404 })
  }

  return Response.json(project)
}
