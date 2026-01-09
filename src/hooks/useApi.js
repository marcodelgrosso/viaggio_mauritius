import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function useInterestedCount() {
  const [count, setCount] = useState(7) // Fallback value
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/interested`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setCount(data.count || 7)
      } catch (err) {
        console.error('Error fetching interested count:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  return { count, loading, error }
}

export function useSubmitInterest() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submit = async (data) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(`${API_BASE_URL}/interested`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      const result = await response.json()
      setSuccess(true)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error, success }
}
