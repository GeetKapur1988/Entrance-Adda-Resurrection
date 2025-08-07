import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

async function sha512Hex(input: string): Promise<string> {
  const buffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-512", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0")) // <– ensures full two-digit hex
    .join("")
    .toLowerCase();
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  try {
    const { key, txnid, amount, productinfo, firstname, email } = await req.json();

    const salt = Deno.env.get("PAYU_SALT");
    if (!salt) {
      return new Response(JSON.stringify({ error: "Missing PAYU_SALT" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    console.log("🚨 HASH INPUT:", hashString);
    const finalHash = await sha512Hex(hashString);
    console.log("Final Hash:", finalHash);
    return new Response(JSON.stringify({ hash: finalHash }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Hash generation error:", err);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
});