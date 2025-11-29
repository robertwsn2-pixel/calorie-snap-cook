import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Droplets, TrendingUp, Heart, Dumbbell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import LanguageSelector from "@/components/LanguageSelector";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { cn } from "@/lib/utils";

const Progress = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  useSwipeNavigation({
    routes: ["/", "/workouts", "/progress"],
    enabled: true,
  });

  const [selectedPeriod, setSelectedPeriod] = useState<"7D" | "14D" | "30D" | "90D">("7D");

  const periods = [
    { label: t('progress.period.7d'), value: "7D" },
    { label: t('progress.period.14d'), value: "14D" },
    { label: t('progress.period.30d'), value: "30D" },
    { label: t('progress.period.90d'), value: "90D" },
  ];

  // Main chart data - Workout volume + calories
  const mainChartData = [
    { day: t('progress.mon'), workouts: 45, calories: 320 },
    { day: t('progress.tue'), workouts: 60, calories: 450 },
    { day: t('progress.wed'), workouts: 30, calories: 280 },
    { day: t('progress.thu'), workouts: 75, calories: 520 },
    { day: t('progress.fri'), workouts: 50, calories: 380 },
    { day: t('progress.sat'), workouts: 90, calories: 620 },
    { day: t('progress.sun'), workouts: 40, calories: 300 },
  ];

  // Hydration consistency
  const hydrationData = [
    { day: t('progress.mon'), glasses: 7 },
    { day: t('progress.tue'), glasses: 8 },
    { day: t('progress.wed'), glasses: 6 },
    { day: t('progress.thu'), glasses: 8 },
    { day: t('progress.fri'), glasses: 7 },
    { day: t('progress.sat'), glasses: 8 },
    { day: t('progress.sun'), glasses: 6 },
  ];

  // Mood averages
  const moodData = [
    { day: t('progress.mon'), mood: 7 },
    { day: t('progress.tue'), mood: 8 },
    { day: t('progress.wed'), mood: 6 },
    { day: t('progress.thu'), mood: 9 },
    { day: t('progress.fri'), mood: 8 },
    { day: t('progress.sat'), mood: 9 },
    { day: t('progress.sun'), mood: 7 },
  ];

  // Training frequency
  const trainingData = [
    { day: t('progress.mon'), sessions: 1 },
    { day: t('progress.tue'), sessions: 2 },
    { day: t('progress.wed'), sessions: 1 },
    { day: t('progress.thu'), sessions: 2 },
    { day: t('progress.fri'), sessions: 1 },
    { day: t('progress.sat'), sessions: 2 },
    { day: t('progress.sun'), sessions: 1 },
  ];

  // Meal balance
  const mealData = [
    { type: t('progress.breakfast'), percentage: 95 },
    { type: t('progress.lunch'), percentage: 100 },
    { type: t('progress.dinner'), percentage: 85 },
    { type: t('progress.snacks'), percentage: 70 },
  ];

  const chartConfig = {
    workouts: {
      label: t('progress.workoutMinutes'),
      color: "hsl(var(--primary))",
    },
    calories: {
      label: t('progress.caloriesBurnedLabel'),
      color: "hsl(var(--accent))",
    },
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border/40 sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-secondary/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">{t('progress.evolution')}</h1>
              <p className="text-sm text-muted-foreground">{t('progress.subtitle')}</p>
            </div>
            <LanguageSelector />
          </motion.div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-6 py-6 space-y-8">
        {/* Week Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2"
        >
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value as any)}
              className={cn(
                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all",
                selectedPeriod === period.value
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
            >
              {period.label}
            </button>
          ))}
        </motion.div>

        {/* Main Chart - Workout Volume + Calories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-6 shadow-soft border-border/40">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">{t('progress.activityOverview')}</h2>
              <p className="text-xs text-muted-foreground">{t('progress.activityDescription')}</p>
            </div>

            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={mainChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    yAxisId="left"
                    dataKey="workouts"
                    fill="hsl(var(--primary))"
                    radius={[8, 8, 0, 0]}
                    opacity={0.8}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="calories"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2.5}
                    dot={{ fill: "hsl(var(--accent))", r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">{t('progress.workoutMinutes')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">{t('progress.caloriesBurned')}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Secondary Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hydration Consistency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 shadow-soft border-border/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{t('progress.hydration')}</h3>
                  <p className="text-xs text-muted-foreground">{t('progress.dailyWaterIntake')}</p>
                </div>
              </div>

              <ChartContainer config={chartConfig} className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hydrationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="day"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Bar
                      dataKey="glasses"
                      fill="hsl(212, 100%, 60%)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <p className="text-center text-sm font-semibold text-foreground mt-4">
                7.3 <span className="text-xs font-normal text-muted-foreground">{t('progress.avgGlassesDay')}</span>
              </p>
            </Card>
          </motion.div>

          {/* Mood Averages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-6 shadow-soft border-border/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{t('progress.mood')}</h3>
                  <p className="text-xs text-muted-foreground">{t('progress.dailyMoodScore')}</p>
                </div>
              </div>

              <ChartContainer config={chartConfig} className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="day"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 10]}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="hsl(330, 90%, 60%)"
                      strokeWidth={2.5}
                      dot={{ fill: "hsl(330, 90%, 60%)", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>

              <p className="text-center text-sm font-semibold text-foreground mt-4">
                7.7 <span className="text-xs font-normal text-muted-foreground">{t('progress.avgMoodScore')}</span>
              </p>
            </Card>
          </motion.div>

          {/* Training Frequency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 shadow-soft border-border/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Dumbbell className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{t('progress.frequency')}</h3>
                  <p className="text-xs text-muted-foreground">{t('progress.sessionsPerDay')}</p>
                </div>
              </div>

              <ChartContainer config={chartConfig} className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trainingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="day"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Bar
                      dataKey="sessions"
                      fill="hsl(142, 76%, 50%)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <p className="text-center text-sm font-semibold text-foreground mt-4">
                1.4 <span className="text-xs font-normal text-muted-foreground">{t('progress.avgSessionsDay')}</span>
              </p>
            </Card>
          </motion.div>

          {/* Meal Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="p-6 shadow-soft border-border/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{t('progress.meals')}</h3>
                  <p className="text-xs text-muted-foreground">{t('progress.consistencyScore')}</p>
                </div>
              </div>

              <div className="space-y-4">
                {mealData.map((meal, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{meal.type}</span>
                      <span className="text-xs font-semibold text-foreground">{meal.percentage}%</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${meal.percentage}%`,
                          backgroundColor: "hsl(var(--primary))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm font-semibold text-foreground mt-6">
                88% <span className="text-xs font-normal text-muted-foreground">{t('progress.overallConsistency')}</span>
              </p>
            </Card>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <Button
            variant="outline"
            className="w-full h-12 bg-card hover:bg-secondary/50 transition-smooth shadow-soft border-border/40"
            onClick={() => {
              // Navigate to full history
            }}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('progress.viewHistory')}
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Progress;
