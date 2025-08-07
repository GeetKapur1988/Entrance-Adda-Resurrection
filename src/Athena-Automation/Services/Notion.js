import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
dotenv.config(); // ✅ Load .env in case this file runs independently

// ✅ Confirm token and DB ID visibility
console.log('🔐 NOTION TOKEN:', process.env.ATHENA_NOTION_TOKEN?.slice(0, 12) + '...');
console.log('🧾 DB ID:', process.env.ATHENA_NOTION_DB);

const notion = new Client({ auth: process.env.ATHENA_NOTION_TOKEN });

export async function handleNotionCommand(commandText) {
  try {
    const subject = commandText.split('::')[1]?.trim();
    if (!subject) throw new Error('Invalid Notion subject');

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.ATHENA_NOTION_DB
        // 👇 Hardcode here if still broken:
        // database_id: '2325152a129d80309047ee7b2b7badc1'
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: subject,
              },
            },
          ],
        },
      },
    });

    console.log(`✅ Notion page created for: ${subject}`);
    return `✅ Notion entry created: ${subject}`;
  } catch (error) {
    console.error('🧨 Notion Error:', error);
    throw error;
  }
}