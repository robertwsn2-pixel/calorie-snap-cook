import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ChefHat, Flame, TrendingUp, Apple, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [dailyCalories] = useState({
    consumed: 1245,
    goal: 2000,
  });

  const caloriesPercentage = (dailyCalories.consumed / dailyCalories.goal) * 100;
  const remaining = dailyCalories.goal - dailyCalories.consumed;

  const recentMeals = [
    { name: "Café da Manhã", time: "08:30", calories: 350 },
    { name: "Lanche da Manhã", time: "10:45", calories: 180 },
    { name: "Almoço", time: "13:00", calories: 715 },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <header className="bg-gradient-primary text-primary-foreground">
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold mb-2">Seu Diário Alimentar</h1>
            <p className="text-primary-foreground/80">
              Acompanhe suas refeições e atinja seus objetivos
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 -mt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 shadow-card bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-primary" />
                <span className="font-semibold">Calorias Hoje</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">
                  {dailyCalories.consumed}
                </p>
                <p className="text-sm text-muted-foreground">de {dailyCalories.goal}</p>
              </div>
            </div>
            <Progress value={caloriesPercentage} className="h-3 mb-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {caloriesPercentage.toFixed(0)}% do objetivo
              </span>
              <span className="text-accent font-medium">
                {remaining > 0 ? `${remaining} restantes` : "Meta atingida! 🎉"}
              </span>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => navigate("/food-photo")}
              className="w-full h-32 bg-gradient-primary hover:opacity-90 transition-smooth flex-col gap-3 shadow-medium"
              size="lg"
            >
              <Camera className="h-10 w-10" />
              <span className="text-base font-medium">Tirar Foto da Comida</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => navigate("/recipes")}
              className="w-full h-32 bg-gradient-accent hover:opacity-90 transition-smooth flex-col gap-3 shadow-medium"
              size="lg"
            >
              <ChefHat className="h-10 w-10" />
              <span className="text-base font-medium">Criar Receitas</span>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Apple className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-semibold">Refeições de Hoje</h2>
            </div>

            <div className="space-y-3">
              {recentMeals.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth"
                >
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">
                      {meal.calories}
                    </p>
                    <p className="text-xs text-muted-foreground">calorias</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={() => navigate("/progress")}
            className="w-full bg-gradient-accent hover:opacity-90 transition-smooth shadow-medium"
            size="lg"
          >
            <div className="flex items-center gap-3 py-2">
              <BarChart3 className="h-6 w-6" />
              <div className="text-left">
                <h3 className="text-lg font-semibold">Ver Progresso</h3>
                <p className="text-accent-foreground/80 text-sm">
                  Acompanhe sua evolução e estatísticas
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
