import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dnxsfysrpbuckrlfkmrp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueHNmeXNycGJ1Y2tybGZrbXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTczMzIsImV4cCI6MjA2NDYzMzMzMn0.GeSjeNo-R7MuQf5t6U1pzneOiXIe1ubEkc69kyBeajY'

export const supabase = createClient(supabaseUrl, supabaseKey)