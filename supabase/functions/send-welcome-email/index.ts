import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-WELCOME-EMAIL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { userEmail, userName, subscriptionType, amount, interval } = await req.json();
    logStep("Email request received", { userEmail, subscriptionType });

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const isYearly = interval === 'year';
    const planName = isYearly ? 'Premium Yearly' : 'Premium Monthly';
    const savings = isYearly ? ' (Save $110 annually!)' : '';
    const nextBilling = isYearly ? 'in 1 year' : 'in 1 month';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Sage.ai Premium!</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a; margin-bottom: 10px;">🧠 Welcome to Sage.ai Premium!</h1>
            <p style="color: #666; font-size: 18px;">Your AI Business Transformation Starts Now</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #16a34a; margin-top: 0;">🎉 Subscription Confirmed!</h2>
            <p>Hi ${userName || 'there'},</p>
            <p>Thank you for upgrading to <strong>Sage.ai ${planName}</strong>${savings}! Your payment has been processed successfully.</p>
            
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">📋 Subscription Details</h3>
              <p><strong>Plan:</strong> ${planName}</p>
              <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)} USD</p>
              <p><strong>Billing:</strong> ${interval === 'year' ? 'Annually' : 'Monthly'}</p>
              <p><strong>Next billing:</strong> ${nextBilling}</p>
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #16a34a;">🚀 What You Now Have Access To:</h2>
            <ul style="padding-left: 20px;">
              <li><strong>Unlimited AI Copywriting</strong> - Website copy, ads, emails & social content</li>
              <li><strong>Advanced E-commerce Tools</strong> - Product research, trending analysis & store optimization</li>
              <li><strong>Marketing Automation</strong> - Campaign creation, lead scoring & performance tracking</li>
              <li><strong>Sales Intelligence</strong> - Prospect research, sequence automation & meeting insights</li>
              <li><strong>Priority Support</strong> - Get help when you need it most</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get("SUPABASE_URL") ? 
              `https://qtckfvprvpxbbteinxve.supabase.co` : 
              'https://your-app.com'}/dashboard" 
               style="background: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              🎯 Start Using Premium Features
            </a>
          </div>

          <div style="background: #e7f3ff; padding: 20px; border-radius: 6px; margin: 30px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">💡 Pro Tips to Get Started:</h3>
            <ol style="padding-left: 20px;">
              <li>Try the AI Website Builder for instant e-commerce stores</li>
              <li>Use the Product Research tool to find trending opportunities</li>
              <li>Generate your first marketing campaign with our automation tools</li>
              <li>Set up your first sales sequence to capture and convert leads</li>
            </ol>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Need help? Contact our support team anytime.</p>
            <p>Manage your subscription anytime in your dashboard.</p>
            <p style="margin-top: 20px;">
              <strong>Sage.ai</strong><br>
              Transforming Business with AI
            </p>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Sage.ai <welcome@sage-ai.com>',
      to: [userEmail],
      subject: `🎉 Welcome to Sage.ai ${planName}! Your AI Business Transformation Starts Now`,
      html: emailHtml,
    });

    if (error) {
      logStep("Resend error", error);
      throw error;
    }

    logStep("Welcome email sent successfully", { messageId: data?.id });

    return new Response(JSON.stringify({ success: true, messageId: data?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in send-welcome-email", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});