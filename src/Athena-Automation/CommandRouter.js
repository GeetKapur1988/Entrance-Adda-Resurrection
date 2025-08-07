import { handleNotionCommand } from './Services/Notion.js';
// Add more handlers like handleSupabase later

export function routeCommand(commandText) {
  if (commandText.startsWith("UPDATE_NOTION"))
    return handleNotionCommand(commandText);

  // if (commandText.startsWith("INSERT_SUPABASE"))
  //   return handleSupabase(commandText);

  // ❗ Add fallback here:
  return Promise.reject("❌ Unknown command: " + commandText);
}