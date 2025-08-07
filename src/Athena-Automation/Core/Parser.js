function parseCommand(emailBody) {
  if (emailBody.includes('notion')) {
    return { action: 'notion', subject: emailBody };
  } else if (emailBody.includes('supabase')) {
    return { action: 'supabase', subject: emailBody };
  }
  return { action: 'none', subject: emailBody };
}

module.exports = parseCommand;
