import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials not found. Some features may not work.')
}

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Get interested people count
app.get('/api/interested', async (req, res) => {
  try {
    if (!supabase) {
      return res.json({ count: 7 }) // Fallback value
    }

    const { count, error } = await supabase
      .from('interested_people')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    res.json({ count: count || 0 })
  } catch (error) {
    console.error('Error fetching interested people:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

// Add interested person
app.post('/api/interested', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Database not configured' })
    }

    const { name, email, phone, message } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    const { data, error } = await supabase
      .from('interested_people')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message: message || null,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error adding interested person:', error)
    res.status(500).json({ error: 'Failed to save data' })
  }
})

// Get trip details
app.get('/api/trip', async (req, res) => {
  try {
    if (!supabase) {
      // Return static data if Supabase is not configured
      return res.json({
        id: 1,
        destination: 'Mauritius',
        dates: '20-28 marzo 2026',
        price: 2570,
        deposit: 200,
        interested_count: 7
      })
    }

    const { data, error } = await supabase
      .from('trip_details')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) throw error

    res.json(data || {})
  } catch (error) {
    console.error('Error fetching trip details:', error)
    res.status(500).json({ error: 'Failed to fetch trip details' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`)
})
