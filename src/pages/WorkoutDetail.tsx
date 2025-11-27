import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, Plus, Minus, Lightbulb, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  id: number;
  name: string;
  description: string;
  sets: number;
  reps: number;
  rest: number;
  thumbnail: string;
  currentReps: number;
  completed: boolean;
}

const WorkoutDetail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [workout] = useState({
    name: "Full Body Beginner",
    duration: 20,
    calories: 180,
    level: "Easy",
    description: "Ideal for warming up or starting your routine",
  });

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      name: "Squats",
      description: "Works legs and glutes",
      sets: 3,
      reps: 12,
      rest: 30,
      thumbnail: "🏋️",
      currentReps: 0,
      completed: false,
    },
    {
      id: 2,
      name: "Push-ups",
      description: "Works chest and arms",
      sets: 3,
      reps: 10,
      rest: 30,
      thumbnail: "💪",
      currentReps: 0,
      completed: false,
    },
    {
      id: 3,
      name: "Plank",
      description: "Works core stability",
      sets: 3,
      reps: 30,
      rest: 30,
      thumbnail: "🧘",
      currentReps: 0,
      completed: false,
    },
    {
      id: 4,
      name: "Lunges",
      description: "Works legs and balance",
      sets: 3,
      reps: 10,
      rest: 30,
      thumbnail: "🦵",
      currentReps: 0,
      completed: false,
    },
    {
      id: 5,
      name: "Jumping Jacks",
      description: "Works cardio and coordination",
      sets: 3,
      reps: 15,
      rest: 30,
      thumbnail: "🤸",
      currentReps: 0,
      completed: false,
    },
  ]);

  const updateReps = (exerciseId: number, change: number) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              currentReps: Math.max(0, Math.min(ex.reps, ex.currentReps + change)),
            }
          : ex
      )
    );
  };

  const toggleCompleted = (exerciseId: number) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, completed: !ex.completed }
          : ex
      )
    );
  };

  const completedCount = exercises.filter((ex) => ex.completed).length;
  const progressPercentage = (completedCount / exercises.length) * 100;

  const addToLog = () => {
    toast({
      title: "Added to Daily Log",
      description: `${workout.name} (${workout.duration} min, ${workout.calories} cal)`,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800/50 sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/workouts")}
            className="text-white hover:bg-slate-800/50 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{workout.name}</h1>
                <p className="text-sm text-slate-400 mb-1">
                  {workout.duration} min • {workout.calories} kcal • Level: {workout.level}
                </p>
                <p className="text-xs text-slate-500">{workout.description}</p>
              </div>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 rounded-full hover:bg-slate-800/50 transition-colors"
              >
                <Bookmark
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isBookmarked ? "fill-orange-500 text-orange-500" : "text-slate-400"
                  )}
                />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <Progress
                value={progressPercentage}
                className="h-1.5 bg-slate-800"
              />
              <p className="text-xs text-slate-500 mt-1.5">
                {completedCount} of {exercises.length} exercises completed
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-6 py-6 space-y-5">
        {/* Exercises List */}
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card
                className={cn(
                  "bg-slate-900/50 border-slate-800/50 p-4 transition-all",
                  exercise.completed && "opacity-70 border-orange-500/30"
                )}
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-lg bg-slate-800/50 flex items-center justify-center text-2xl flex-shrink-0">
                    {exercise.thumbnail}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-0.5">
                          {exercise.name}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {exercise.description}
                        </p>
                      </div>

                      {/* Completed Checkbox */}
                      <div className="ml-2 flex items-center gap-2">
                        <Checkbox
                          checked={exercise.completed}
                          onCheckedChange={() => toggleCompleted(exercise.id)}
                          className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Sets/Reps/Rest */}
                    <p className="text-xs text-slate-500 mb-3">
                      {exercise.sets} sets • {exercise.reps} reps • {exercise.rest}s rest
                    </p>

                    {/* Rep Counter */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateReps(exercise.id, -1)}
                          disabled={exercise.currentReps === 0}
                          className="h-7 w-7 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-white disabled:opacity-30"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <div className="flex-1 text-center">
                          <span className="text-sm font-medium text-orange-500">
                            {exercise.currentReps}
                          </span>
                          <span className="text-xs text-slate-500"> / {exercise.reps} reps</span>
                        </div>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateReps(exercise.id, 1)}
                          disabled={exercise.currentReps === exercise.reps}
                          className="h-7 w-7 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-white disabled:opacity-30"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Micro Progress Bar */}
                      <Progress
                        value={(exercise.currentReps / exercise.reps) * 100}
                        className="h-1 bg-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Educational Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-orange-500/10 border-orange-500/20 p-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-4 w-4 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-orange-500">Tip:</span> Keep your
                  posture aligned and breathe during each rep. Focus on form over speed
                  for better results.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Section - Quick Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 pt-2"
        >
          {/* Summary */}
          <Card className="bg-slate-900/50 border-slate-800/50 p-5">
            <div className="flex items-center justify-between text-sm mb-4">
              <div>
                <p className="text-slate-400 text-xs mb-1">Total Time</p>
                <p className="text-xl font-bold text-white">{workout.duration} min</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-xs mb-1">Estimated Calories</p>
                <p className="text-xl font-bold text-orange-500">{workout.calories} kcal</p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={addToLog}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg shadow-orange-500/30 h-12 text-base font-semibold"
            >
              <Check className="h-5 w-5 mr-2" />
              Add to Daily Log
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default WorkoutDetail;
