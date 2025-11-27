import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Dumbbell, Heart, Zap, Move, Wind, Bookmark, Clock, Flame, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import workoutStrength from "@/assets/workout-strength.jpg";
import workoutCardio from "@/assets/workout-cardio.jpg";
import workoutHiit from "@/assets/workout-hiit.jpg";
import workoutYoga from "@/assets/workout-yoga.jpg";
import workoutStretching from "@/assets/workout-stretching.jpg";
import workoutCore from "@/assets/workout-core.jpg";

const Workouts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedWorkouts, setBookmarkedWorkouts] = useState<Set<number>>(new Set());
  
  useSwipeNavigation({
    routes: ["/", "/workouts", "/progress"],
    enabled: true,
  });

  const categories = [
    { name: "All", icon: Dumbbell },
    { name: "Strength", icon: Dumbbell },
    { name: "Cardio", icon: Heart },
    { name: "HIIT", icon: Zap },
    { name: "Mobility", icon: Wind },
    { name: "Stretching", icon: Move },
  ];

  const workouts = [
    {
      id: 1,
      name: "Full Body Strength",
      duration: 45,
      calories: 320,
      category: "Strength",
      thumbnail: workoutStrength,
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      id: 2,
      name: "Morning Cardio Blast",
      duration: 30,
      calories: 280,
      category: "Cardio",
      thumbnail: workoutCardio,
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: 3,
      name: "HIIT Power Session",
      duration: 20,
      calories: 250,
      category: "HIIT",
      thumbnail: workoutHiit,
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      id: 4,
      name: "Yoga Flow & Mobility",
      duration: 40,
      calories: 150,
      category: "Mobility",
      thumbnail: workoutYoga,
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      id: 5,
      name: "Evening Stretching",
      duration: 15,
      calories: 80,
      category: "Stretching",
      thumbnail: workoutStretching,
      color: "from-indigo-500/20 to-blue-500/20",
    },
    {
      id: 6,
      name: "Core Crusher",
      duration: 25,
      calories: 200,
      category: "Strength",
      thumbnail: workoutCore,
      color: "from-amber-500/20 to-orange-500/20",
    },
  ];

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesCategory = selectedCategory === "All" || workout.category === selectedCategory;
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (workoutId: number) => {
    setBookmarkedWorkouts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(workoutId)) {
        newSet.delete(workoutId);
      } else {
        newSet.add(workoutId);
      }
      return newSet;
    });
  };

  const addToLog = (workoutName: string, calories: number, duration: number) => {
    toast({
      title: "Added to Daily Log",
      description: `${workoutName} (${duration} min, ${calories} cal)`,
    });
  };

  return (
    <div className="min-h-screen bg-[#FF6F00] pb-20">
      <header className="bg-[#FF6F00] border-b border-white/10">
        <div className="container max-w-2xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-[#F4F4F4] mb-2">Workout Mode</h1>
            <p className="text-sm text-[#F4F4F4]/80">
              Choose your training for today
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-6 py-6 space-y-5">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F4F4F4]/60" />
            <Input
              type="text"
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-white/10 backdrop-blur-sm border-white/20 text-[#F4F4F4] placeholder:text-[#F4F4F4]/60 rounded-2xl focus:border-[#FF005C] focus:ring-[#FF005C]"
            />
          </div>
        </motion.div>

        {/* Category Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all font-medium",
                    selectedCategory === category.name
                      ? "bg-[#FF005C] text-[#F4F4F4] shadow-lg shadow-[#FF005C]/30"
                      : "bg-white/10 backdrop-blur-sm text-[#F4F4F4]/80 hover:bg-white/20 border border-white/20"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Workout Cards */}
        <div className="space-y-4">
          {filteredWorkouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
            >
              <Card className="overflow-hidden shadow-xl bg-white border-white/20 hover:bg-white/95 transition-all">
                <div className="flex">
                  {/* Thumbnail */}
                  <div className="w-28 h-28 overflow-hidden flex-shrink-0">
                    <img 
                      src={workout.thumbnail} 
                      alt={workout.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-black mb-1 text-base">
                          {workout.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-black/60">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{workout.duration} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            <span>{workout.calories} cal</span>
                          </div>
                        </div>
                      </div>

                      {/* Bookmark */}
                      <button
                        onClick={() => toggleBookmark(workout.id)}
                        className="p-2 rounded-full hover:bg-black/5 transition-colors"
                      >
                        <Bookmark
                          className={cn(
                            "h-4 w-4 transition-colors",
                            bookmarkedWorkouts.has(workout.id)
                              ? "fill-[#FF005C] text-[#FF005C]"
                              : "text-black/40"
                          )}
                        />
                      </button>
                    </div>

                    {/* Add Button */}
                    <Button
                      size="sm"
                      onClick={() => navigate(`/workouts/${workout.id}`)}
                      className="w-full mt-auto bg-white hover:bg-white/90 text-black border-0 rounded-xl font-semibold shadow-lg"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredWorkouts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-[#F4F4F4]/60" />
            </div>
            <p className="text-[#F4F4F4]/80 font-medium">No workouts found</p>
            <p className="text-sm text-[#F4F4F4]/60">Try a different search or category</p>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-white hover:bg-white/90 text-black border-0 rounded-xl h-12 font-semibold shadow-lg"
          >
            Back to Daily Log
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Workouts;
