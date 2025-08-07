const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.ATHENA_SUPABASE_URL, process.env.ATHENA_SUPABASE_KEY);

async function logSubject(subject) {
  try {
    const { data, error } = await supabase
      .from('athena_logs')
      .insert([{ subject }]);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Supabase Insert Error:', err);
    throw err;
  }
}

module.exports = logSubject;
