import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Droplets, Dumbbell, TrendingUp, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
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
} from "recharts";

const Progress = () => {
  const navigate = useNavigate();

  // Daily goals data
  const [dailyGoals] = useState({
    calories: { current: 1245, goal: 2000 },
    water: { current: 6, goal: 8 },
    workouts: { current: 1, goal: 1 },
  });

  // Weekly calorie data
  const weeklyCalories = [
    { day: "Seg", consumed: 1850, goal: 2000 },
    { day: "Ter", consumed: 2100, goal: 2000 },
    { day: "Qua", consumed: 1920, goal: 2000 },
    { day: "Qui", consumed: 1780, goal: 2000 },
    { day: "Sex", consumed: 2050, goal: 2000 },
    { day: "Sáb", consumed: 1900, goal: 2000 },
    { day: "Dom", consumed: 1245, goal: 2000 },
  ];

  // Workout data
  const workoutData = [
    { week: "Sem 1", workouts: 3 },
    { week: "Sem 2", workouts: 5 },
    { week: "Sem 3", workouts: 4 },
    { week: "Sem 4", workouts: 6 },
  ];

  // Meal distribution
  const mealDistribution = [
    { type: "Café", count: 7, color: "hsl(var(--primary))" },
    { type: "Almoço", count: 7, color: "hsl(var(--accent))" },
    { type: "Jantar", count: 6, color: "hsl(var(--secondary))" },
    { type: "Lanches", count: 12, color: "hsl(var(--muted))" },
  ];

  // Summary stats
  const weeklyTotal = weeklyCalories.reduce((sum, day) => sum + day.consumed, 0);
  const totalWorkouts = workoutData.reduce((sum, week) => sum + week.workouts, 0);
  const consecutiveDays = 7;

  const chartConfig = {
    consumed: {
      label: "Consumido",
      color: "hsl(var(--primary))",
    },
    goal: {
      label: "Meta",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <header className="bg-gradient-primary text-primary-foreground sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold mb-2">Seu Progresso</h1>
            <p className="text-primary-foreground/80">
              Acompanhe treinos, calorias e hábitos
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Daily Goals Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Metas de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" />
                    <span>Calorias</span>
                  </div>
                  <span className="font-medium">
                    {dailyGoals.calories.current}/{dailyGoals.calories.goal}
                  </span>
                </div>
                <ProgressBar
                  value={(dailyGoals.calories.current / dailyGoals.calories.goal) * 100}
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-accent" />
                    <span>Água (copos)</span>
                  </div>
                  <span className="font-medium">
                    {dailyGoals.water.current}/{dailyGoals.water.goal}
                  </span>
                </div>
                <ProgressBar
                  value={(dailyGoals.water.current / dailyGoals.water.goal) * 100}
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-secondary" />
                    <span>Treinos</span>
                  </div>
                  <span className="font-medium">
                    {dailyGoals.workouts.current}/{dailyGoals.workouts.goal}
                  </span>
                </div>
                <ProgressBar
                  value={(dailyGoals.workouts.current / dailyGoals.workouts.goal) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Calorie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Evolução Semanal - Calorias</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyCalories}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="day"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="consumed"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="goal"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workout Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-secondary" />
                Treinos Concluídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="week"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="workouts"
                      fill="hsl(var(--secondary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Meal Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Histórico de Refeições</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mealDistribution.map((meal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{meal.type}</span>
                    <span className="font-medium">{meal.count} refeições</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-smooth"
                      style={{
                        width: `${(meal.count / 12) * 100}%`,
                        backgroundColor: meal.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4"
        >
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Flame className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-primary">{weeklyTotal}</p>
              <p className="text-xs text-muted-foreground mt-1">
                calorias na semana
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Dumbbell className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold text-secondary">{totalWorkouts}</p>
              <p className="text-xs text-muted-foreground mt-1">
                treinos completos
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold text-accent">{consecutiveDays}</p>
              <p className="text-xs text-muted-foreground mt-1">
                dias consecutivos
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-accent text-accent-foreground shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Sequência de {consecutiveDays} dias!</h3>
              </div>
              <p className="text-accent-foreground/80">
                Você está mantendo o foco e construindo hábitos saudáveis. Continue assim
                e alcance suas metas!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Progress;
