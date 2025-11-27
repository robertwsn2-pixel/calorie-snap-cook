import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ChefHat, Flame, Apple, BarChart3, Droplets, Activity, Zap, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  const [dailyCalories] = useState({
    consumed: 1250,
    goal: 1800,
  });

  const [streak] = useState({
    current: 3,
    goal: 4,
  });

  const [waterIntake] = useState({
    current: 6,
    goal: 8,
  });

  const [hydrationMode, setHydrationMode] = useState<"normal" | "work">("normal");

  const [activity] = useState({
    minutes: 15,
    type: "Walking",
  });

  const caloriesPercentage = (dailyCalories.consumed / dailyCalories.goal) * 100;

  const meals = [
    { name: "Breakfast", time: "08:30", calories: 350, icon: "🥐", color: "bg-amber-100 dark:bg-amber-950" },
    { name: "Lunch", time: "13:00", calories: 715, icon: "🍱", color: "bg-green-100 dark:bg-green-950" },
    { name: "Snack", time: "10:45", calories: 180, icon: "🍎", color: "bg-red-100 dark:bg-red-950" },
    { name: "Dinner", time: "--:--", calories: 0, icon: "🍽️", color: "bg-purple-100 dark:bg-purple-950" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border/40">
        <div className="container max-w-2xl mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-semibold text-foreground mb-1">Daily Log</h1>
            <p className="text-sm text-muted-foreground">
              Track your meals, water, and activity
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-6 py-6 space-y-5">
        {/* Action Buttons - Top Priority */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Button
              onClick={() => navigate("/food-photo")}
              className="w-full h-28 bg-gradient-primary hover:opacity-90 transition-smooth flex-col gap-2 shadow-medium border-0"
              size="lg"
            >
              <Camera className="h-8 w-8" />
              <span className="text-sm font-medium">Food Photo</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Button
              onClick={() => navigate("/recipes")}
              className="w-full h-28 bg-gradient-accent hover:opacity-90 transition-smooth flex-col gap-2 shadow-medium border-0"
              size="lg"
            >
              <ChefHat className="h-8 w-8" />
              <span className="text-sm font-medium">Recipes</span>
            </Button>
          </motion.div>
        </div>

        {/* Calorie Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5 shadow-soft bg-card border border-border/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Calories</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  {dailyCalories.consumed}
                  <span className="text-base font-normal text-muted-foreground"> / {dailyCalories.goal}</span>
                </p>
              </div>
            </div>
            <Progress value={caloriesPercentage} className="h-2 mb-2" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {caloriesPercentage.toFixed(0)}% of goal
              </span>
              <span className="text-primary font-medium">
                {dailyCalories.goal - dailyCalories.consumed} remaining
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Streak Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-5 shadow-soft bg-card border border-border/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">Streak</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {streak.current}
                <span className="text-base font-normal text-muted-foreground"> / {streak.goal} days</span>
              </p>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: streak.goal }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-2 rounded-full transition-all",
                    i < streak.current ? "bg-accent" : "bg-secondary"
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Keep it up! 1 more day to reach your goal</p>
          </Card>
        </motion.div>

        {/* Meals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-5 shadow-soft border border-border/40">
            <div className="flex items-center gap-2 mb-4">
              <Apple className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Today's Meals</h2>
            </div>

            <div className="space-y-2">
              {meals.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-smooth"
                >
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl", meal.color)}>
                    {meal.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{meal.name}</p>
                    <p className="text-xs text-muted-foreground">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold text-foreground">
                      {meal.calories > 0 ? meal.calories : "-"}
                    </p>
                    <p className="text-xs text-muted-foreground">cal</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Hydration Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-5 shadow-soft bg-card border border-border/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Droplets className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-foreground">Hydration</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {waterIntake.current} / {waterIntake.goal} glasses
              </p>
            </div>

            <div className="flex gap-2 mb-4">
              {Array.from({ length: waterIntake.goal }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-10 rounded-lg flex items-center justify-center transition-all",
                    i < waterIntake.current
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <Droplets className="h-4 w-4" />
                </div>
              ))}
            </div>

            {/* Hydration Reminder Widget */}
            <div className="pt-4 border-t border-border/40">
              <p className="text-xs font-medium text-muted-foreground mb-3">Reminder Mode</p>
              <div className="flex gap-2">
                <Button
                  variant={hydrationMode === "normal" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setHydrationMode("normal")}
                >
                  <Moon className="h-3 w-3 mr-1.5" />
                  Normal
                </Button>
                <Button
                  variant={hydrationMode === "work" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setHydrationMode("work")}
                >
                  <Zap className="h-3 w-3 mr-1.5" />
                  Work
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {hydrationMode === "normal"
                  ? "Reminders every 2 hours"
                  : "Reminders every hour during work"}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Activity Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="p-5 shadow-soft bg-card border border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Today's Activity</p>
                <p className="text-xs text-muted-foreground">{activity.type}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{activity.minutes}</p>
                <p className="text-xs text-muted-foreground">minutes</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Progress Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => navigate("/progress")}
            variant="outline"
            className="w-full bg-card hover:bg-secondary/50 transition-smooth shadow-soft border-border/40"
            size="lg"
          >
            <div className="flex items-center gap-3 py-1">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div className="text-left flex-1">
                <h3 className="text-sm font-semibold text-foreground">View Progress</h3>
                <p className="text-xs text-muted-foreground">
                  Track your evolution and statistics
                </p>
              </div>
            </div>
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
