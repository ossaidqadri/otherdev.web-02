import Link from 'next/link'
import { buildSocialMetadata } from '@/lib/metadata'
import { getBlogPostBySlug } from '@/lib/payload-api'

export const revalidate = 86400

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found | Other Dev',
    }
  }

  const description = post.excerpt ?? ''

  return {
    title: `${post.title} | Other Dev Blog`,
    description,
    ...buildSocialMetadata({
      title: `${post.title} | Other Dev Blog`,
      description,
      path: `/blog/${slug}`,
      imagePath: post.featuredImage?.url ?? '',
      imageAlt: `${post.title} | Other Dev Blog`,
      type: 'article',
    }),
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 font-semibold mb-2">Blog post not found</h2>
          <p className="text-red-600 mb-4">
            The blog post you are looking for does not exist or has been removed.
          </p>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    )
  }

  const displayDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <article className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {post.title}
        </h1>
        <p className="text-sm text-neutral-600 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
          {displayDate}
        </p>
      </header>

      {post.contentHtml && (
        <div
          className="prose prose-lg w-full content animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '150ms' }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      )}

      <footer className="mt-12 pt-8 border-t border-neutral-200">
        <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to all posts
        </a>
      </footer>
    </article>
  )
}