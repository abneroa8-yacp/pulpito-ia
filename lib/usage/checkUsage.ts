import { createClient } from "@/lib/supabase/server";

export async function checkUsage(
  userId: string,
  idioma: "es" | "en" = "es"
) {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];
  const currentMonth = today.slice(0, 7);

  const { data } = await supabase
    .from("usage_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!data) {
    await supabase.from("usage_stats").insert({
      user_id: userId,
      daily_count: 1,
      monthly_count: 1,
      daily_date: today,
      monthly_period: currentMonth,
    });

    return;
  }

  let dailyCount = data.daily_count;
  let monthlyCount = data.monthly_count;

  if (data.daily_date !== today) {
    dailyCount = 0;
  }

  if (data.monthly_period !== currentMonth) {
    monthlyCount = 0;
  }

  if (dailyCount >= 2) {
    throw new Error(
      idioma === "en"
        ? "You have reached the daily limit of 2 generations."
        : "Has alcanzado el límite de 2 generaciones por día."
    );
  }

  if (monthlyCount >= 9) {
    throw new Error(
      idioma === "en"
        ? "You have reached the monthly limit of 9 generations."
        : "Has alcanzado el límite de 9 generaciones este mes."
    );
  }

  await supabase
    .from("usage_stats")
    .update({
      daily_count: dailyCount + 1,
      monthly_count: monthlyCount + 1,
      daily_date: today,
      monthly_period: currentMonth,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);
}