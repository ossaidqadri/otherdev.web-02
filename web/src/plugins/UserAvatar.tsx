import type { Payload } from 'payload'
import type { Media, User } from '../payload-types'

type Props = {
  payload?: Payload
  user?: User | null
}

export async function UserAvatar({ payload, user }: Props) {
  if (!user || !payload) return null

  const avatarRef = user.avatar
  const avatarId =
    typeof avatarRef === 'string'
      ? avatarRef
      : avatarRef && typeof avatarRef === 'object'
        ? (avatarRef as Media).id
        : null

  if (!avatarId) return null

  const media = await payload
    .findByID({ collection: 'media', id: avatarId, depth: 0 })
    .catch(() => null)

  const url = media?.url ?? null
  if (!url) return null

  return (
    <img
      src={url}
      alt={user.name ?? user.email ?? ''}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
    />
  )
}
