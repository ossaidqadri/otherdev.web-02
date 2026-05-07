'use client'

import { useCallback, useEffect, useState } from 'react'

interface UseLocalStorageMessagesProps<T> {
  key: string
  initialValue?: T[]
  deserialize?: (data: string) => T[]
  serialize?: (data: T[]) => string
  expirationMinutes?: number
  storage?: 'localStorage' | 'sessionStorage'
}

interface StoredData<T> {
  messages: T[]
  timestamp: number
}

const DEFAULT_EXPIRATION_MINUTES = 60

export function useLocalStorageMessages<T>({
  key,
  initialValue = [],
  deserialize,
  serialize,
  expirationMinutes = DEFAULT_EXPIRATION_MINUTES,
  storage = 'localStorage',
}: UseLocalStorageMessagesProps<T>) {
  const [messages, setMessages] = useState<T[]>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from storage after hydration to avoid SSR/client mismatch
  useEffect(() => {
    const store = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage
    try {
      const item = store.getItem(key)
      if (item) {
        const storedData: StoredData<T> = JSON.parse(item)
        const now = Date.now()
        const expirationMs = expirationMinutes * 60 * 1000

        if (now - storedData.timestamp > expirationMs) {
          store.removeItem(key)
        } else {
          const loaded = deserialize
            ? deserialize(JSON.stringify(storedData.messages))
            : storedData.messages
          setMessages(loaded)
        }
      }
    } catch (error) {
      console.error(`Error loading messages from ${storage} (${key}):`, error)
    }
    setIsLoaded(true)
  }, [deserialize, expirationMinutes, key, storage])

  useEffect(() => {
    if (!isLoaded) return
    const store = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage
    try {
      // serialize produces a JSON string of the storable shape (e.g. with ISO date strings).
      // Parse it back so the StoredData wrapper holds the same shape deserialization expects.
      const serialized = serialize ? serialize(messages) : JSON.stringify(messages)
      const dataToStore: StoredData<unknown> = {
        messages: JSON.parse(serialized),
        timestamp: Date.now(),
      }
      store.setItem(key, JSON.stringify(dataToStore))
    } catch (error) {
      console.error(`Error saving messages to ${storage} (${key}):`, error)
    }
  }, [key, messages, isLoaded, serialize, storage])

  const clearHistory = useCallback(() => {
    setMessages(initialValue)
    const store = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage
    try {
      store.removeItem(key)
    } catch (error) {
      console.error(`Error clearing messages from ${storage} (${key}):`, error)
    }
  }, [key, initialValue, storage])

  return { messages, setMessages, clearHistory, isLoaded }
}
