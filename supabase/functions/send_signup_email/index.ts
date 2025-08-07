// Deno-compatible Supabase Edge Function
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req: Request) => {
  // Enable CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("OK", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  const { email, temp_password } = await req.json();

  const smtpHost = Deno.env.get("SMTP_HOST");
  const smtpUser = Deno.env.get("SMTP_USER");
  const smtpPass = Deno.env.get("SMTP_PASS");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    // Send email via Resend or other provider logic here
    // For testing, just log it
    console.log(`📨 Email triggered for: ${email}`);

    await supabase.from("email_logs").insert([
      {
        user_email: email,
        purpose: "signup",
        status: "success",
      },
    ]);

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (err) {
    await supabase.from("email_logs").insert([
      {
        user_email: email,
        purpose: "signup",
        status: "failed",
        error_message: err.message,
      },
    ]);

    return new Response(JSON.stringify({ error: err.message }), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
});
