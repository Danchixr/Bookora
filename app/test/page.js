import { supabase } from '@/lib/supabaseClient'

export default async function TestPage() {
  const { data, error } = await supabase.from('businesses').select('*')

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Supabase Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
