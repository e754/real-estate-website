import express from 'express'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const port = 3001

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_KEY
)

//localhost:3001/events
app.get('/events', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Events')
      .select('*')

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }

    res.json(data)
    console.log(data)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/primary-image/:event_id', async (req, res) => {
  //basically just returns url of primary image. 
  //example: localhost:3001/primary-image/1
  //above case, 1 would be the event_id
  const { event_id } = req.params
  const filename = `${SUPABASE_URL}/storage/v1/object/public/images//${event_id}-primary.png`
  res.send(filename)
})

app.get('/all_images/:event_id', async (req, res) => {
  //get the rest of the images
  const { data, error } = await supabase
    .storage
    .from('images')
    .list('', {
      limit: 100,
      offset: 0,
    })
  if (error) {
    return res.status(500).json({ error: error.message })
  }
  // Generate public or signed URLs for each file
  const imageUrls = data.map(file =>
    `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${file.name}`
  )

  res.json({ images: imageUrls })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})