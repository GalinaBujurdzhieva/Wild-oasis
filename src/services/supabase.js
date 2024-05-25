import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://fgrbobbhvvwehmkekzjx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncmJvYmJodnZ3ZWhta2Vremp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MjQ5MjcsImV4cCI6MjAyOTIwMDkyN30.U0cXyCwONt6Tj4BcufWw5gg9kthies6N2rPprKKGs3g"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;