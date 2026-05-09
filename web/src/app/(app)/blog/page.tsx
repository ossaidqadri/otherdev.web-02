import type { Metadata } from 'next'
import Link from 'next/link'

import { buildSocialMetadata } from '@/lib/metadata'
import { getBlogPosts } from '@/lib/payload-api'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog | Other Dev',
  description:
    'Thoughts, insights, and updates from the Other Dev studio on web development, design, and digital platforms.',
  ...buildSocialMetadata({
    title: 'Blog | Other Dev',
    description:
      'Thoughts, insights, and updates from the Other Dev studio on web development, design, and digital platforms.',
    path: '/blog',
    imagePath: '/images/projects/olly-2025/products-page-desktop.webp',
    imageAlt: 'Blog | Other Dev',
  }),
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-gray-600">No blog posts found.</p>
      </div>
    )
  }

  return (
    <div className="relative px-4 py-4">
      <div className="flex sticky top-0">
        <h1 className="text-sm mb-2 bg-neutral-200 rounded-md p-2 cursor-pointer hover:bg-neutral-300 animate-in fade-in">
          <span className="font-bold">OD</span> / Blog
        </h1>
      </div>
      <p className="text-neutral-600 text-xs mb-8">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} • Powered by Payload CMS
      </p>

      <div className="grid gap-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="md:border duration-300 rounded-md md:p-4 hover:shadow-lg transition-shadow hover:motion-scale-in-102 hover:motion-shadow-in-6 animate-in fade-in slide-in-from-bottom-4 duration-500 motion-duration-300"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <h2 className="text-sm font-bold mb-2">
              <Link href={`/blog/${post.slug}`} className="text-neutral-900 hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-neutral-600 mb-4">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : new Date(post.createdAt).toLocaleDateString()}
            </p>
            {post.excerpt && (
              <p className="text-neutral-700 line-clamp-2">{post.excerpt}</p>
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-4 text-neutral-600 hover:text-neutral-800 text-xs font-medium"
            >
              Read More →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}