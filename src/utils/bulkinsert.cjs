
const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/sync');
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://szlgopcqquwizeivkutc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bGdvcGNxcXV3aXplaXZrdXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDc3NzUsImV4cCI6MjA2NTcyMzc3NX0.jKGNZqqgmhXhTQke5tUPq4bR-Xmhn_RqI_VoTpdsisA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Read CSV
const csvPath = path.join(__dirname, 'questions.csv');
const fileContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse.parse(fileContent, {
  columns: true,
  skip_empty_lines: true
});

console.log(`Parsed ${records.length} questions. Uploading...`);

(async () => {
  const { error } = await supabase.from('Questions').insert(records);

  if (error) {
    console.error('❌ Upload failed:', error);
  } else {
    console.log('✅ Upload successful!');
  }
})();
