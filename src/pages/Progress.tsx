import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Droplets, TrendingUp, Heart, Dumbbell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
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
  
  useSwipeNavigation({
    routes: ["/", "/workouts", "/progress"],
    enabled: true,
  });

  const [selectedPeriod, setSelectedPeriod] = useState<"7D" | "14D" | "30D" | "90D">("7D");

  const periods = [
    { label: "7D", value: "7D" },
    { label: "14D", value: "14D" },
    { label: "30D", value: "30D" },
    { label: "90D", value: "90D" },
  ];

  // Main chart data - Workout volume + calories
  const mainChartData = [
    { day: "Mon", workouts: 45, calories: 320 },
    { day: "Tue", workouts: 60, calories: 450 },
    { day: "Wed", workouts: 30, calories: 280 },
    { day: "Thu", workouts: 75, calories: 520 },
    { day: "Fri", workouts: 50, calories: 380 },
    { day: "Sat", workouts: 90, calories: 620 },
    { day: "Sun", workouts: 40, calories: 300 },
  ];

  // Hydration consistency
  const hydrationData = [
    { day: "Mon", glasses: 7 },
    { day: "Tue", glasses: 8 },
    { day: "Wed", glasses: 6 },
    { day: "Thu", glasses: 8 },
    { day: "Fri", glasses: 7 },
    { day: "Sat", glasses: 8 },
    { day: "Sun", glasses: 6 },
  ];

  // Mood averages
  const moodData = [
    { day: "Mon", mood: 7 },
    { day: "Tue", mood: 8 },
    { day: "Wed", mood: 6 },
    { day: "Thu", mood: 9 },
    { day: "Fri", mood: 8 },
    { day: "Sat", mood: 9 },
    { day: "Sun", mood: 7 },
  ];

  // Training frequency
  const trainingData = [
    { day: "Mon", sessions: 1 },
    { day: "Tue", sessions: 2 },
    { day: "Wed", sessions: 1 },
    { day: "Thu", sessions: 2 },
    { day: "Fri", sessions: 1 },
    { day: "Sat", sessions: 2 },
    { day: "Sun", sessions: 1 },
  ];

  // Meal balance
  const mealData = [
    { type: "Breakfast", percentage: 95 },
    { type: "Lunch", percentage: 100 },
    { type: "Dinner", percentage: 85 },
    { type: "Snacks", percentage: 70 },
  ];

  const chartConfig = {
    workouts: {
      label: "Workout Minutes",
      color: "hsl(var(--primary))",
    },
    calories: {
      label: "Calories Burned",
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
          >
            <h1 className="text-2xl font-semibold text-foreground mb-1">Your Evolution</h1>
            <p className="text-sm text-muted-foreground">Track your progress and insights</p>
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
              <h2 className="text-lg font-semibold text-foreground mb-1">Activity Overview</h2>
              <p className="text-xs text-muted-foreground">Workout minutes and calories burned</p>
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
                <span className="text-xs text-muted-foreground">Workout Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Calories Burned</span>
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
                  <h3 className="font-semibold text-foreground text-sm">Hydration</h3>
                  <p className="text-xs text-muted-foreground">Daily water intake</p>
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
                7.3 <span className="text-xs font-normal text-muted-foreground">avg glasses/day</span>
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
                  <h3 className="font-semibold text-foreground text-sm">Mood</h3>
                  <p className="text-xs text-muted-foreground">Daily mood score</p>
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
                7.7 <span className="text-xs font-normal text-muted-foreground">avg mood score</span>
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
                  <h3 className="font-semibold text-foreground text-sm">Training Frequency</h3>
                  <p className="text-xs text-muted-foreground">Sessions per day</p>
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
                1.4 <span className="text-xs font-normal text-muted-foreground">avg sessions/day</span>
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
                  <h3 className="font-semibold text-foreground text-sm">Meal Balance</h3>
                  <p className="text-xs text-muted-foreground">Consistency score</p>
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
                88% <span className="text-xs font-normal text-muted-foreground">overall consistency</span>
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
            View Full History
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Progress;
