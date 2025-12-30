'use client'

import { useEffect, useState, useLayoutEffect } from 'react'
import VisualEditing from 'next-sanity/visual-editing/client-component'

export default function VisualEditingWrapper() {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Suppress visual editing warnings only after component mounts
    // This allows us to see other errors while suppressing expected warnings
    const originalError = console.error
    const originalWarn = console.warn
    
    const suppressVisualEditingWarning = (method: typeof console.error | typeof console.warn) => {
      return (...args: any[]) => {
        const message = args.map(arg => 
          typeof arg === 'string' ? arg : String(arg || '')
        ).join(' ')
        
        // Suppress expected warnings about visual editing connection
        // These are normal when there's no stega-encoded content in the DOM
        if (message.includes('Unable to connect to visual editing') ||
            message.includes('Unable to connect, check the browser console') ||
            message.includes('visual editing') && message.includes('connect')) {
          // Expected warning - visual editing can't connect without stega content
          return
        }
        method(...args)
      }
    }
    
    console.error = suppressVisualEditingWarning(originalError) as typeof console.error
    console.warn = suppressVisualEditingWarning(originalWarn) as typeof console.warn
    
    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [mounted])

  if (!mounted) {
    return null
  }

  return <VisualEditing />
}
