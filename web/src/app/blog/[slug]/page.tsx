'use client'

import { trpc } from '@/lib/trpc'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const { data: post, isLoading, error } = trpc.content.getBlogPost.useQuery({
    slug,
  })

  if (isLoading) {
    return (
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </article>
    )
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 font-semibold mb-2">Blog post not found</h2>
          <p className="text-red-600 mb-4">
            The blog post you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="text-blue-600 hover:underline"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-8 inline-block"
      >
        ← Back to blog
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <time dateTime={post.publishedAt || post.createdAt}>
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          {post.author && (
            <span>by {post.author.email}</span>
          )}
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {post.categories.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {post.featuredImage && (
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            className="w-full rounded-lg"
          />
        )}
      </header>

      {post.excerpt && (
        <div className="text-xl text-gray-600 mb-8 italic border-l-4 border-gray-300 pl-4">
          {post.excerpt}
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {/* TODO: Render Lexical content properly */}
        {/* For now, showing raw content structure */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">
            Content rendering (Lexical editor output):
          </p>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(post.content, null, 2)}
          </pre>
        </div>
      </div>
    </article>
  )
}
