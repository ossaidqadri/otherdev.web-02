import { projects } from '@/lib/projects'

export async function GET() {
  return Response.json(projects)
}
