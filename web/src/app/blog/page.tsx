'use client'

import { trpc} from '@/lib/trpc'
import Link from 'next/link'

export default function BlogPage() {
  const { data, isLoading, error } = trpc.content.getBlogPosts.useQuery({
    limit: 20,
    page: 1,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 font-semibold mb-2">Error loading blog posts</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    )
  }

  if (!data || data.docs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-gray-600">No blog posts found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-gray-600 mb-8">
        {data.totalDocs} {data.totalDocs === 1 ? 'post' : 'posts'}
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.docs.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {post.featuredImage && (
              <Link href={`/blog/${post.slug}`}>
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  className="w-full h-48 object-cover"
                />
              </Link>
            )}
            <div className="p-6">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              {post.excerpt && (
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                </span>
                {post.categories && post.categories.length > 0 && (
                  <div className="flex gap-2">
                    {post.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat.id}
                        className="px-2 py-1 bg-gray-100 rounded text-xs"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {data.totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {data.hasPrevPage && (
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Previous
            </button>
          )}
          <span className="px-4 py-2">
            Page {data.page} of {data.totalPages}
          </span>
          {data.hasNextPage && (
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Next
            </button>
          )}
        </div>
      )}
    </div>
  )
}
