import { getProjects } from '@/lib/payload-api'

export async function GET() {
  const projects = await getProjects()
  return Response.json(projects)
}
