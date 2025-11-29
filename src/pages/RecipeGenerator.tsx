import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Plus, X, ChefHat, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "@/components/LanguageSelector";

interface Recipe {
  id: number;
  name: string;
  image: string;
  calories: number;
  time: number;
  steps: string[];
}

const RecipeGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [generating, setGenerating] = useState(false);

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const generateRecipes = () => {
    if (ingredients.length === 0) {
      toast({
        title: t('recipes.addIngredients'),
        description: t('recipes.addAtLeastOne'),
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    setTimeout(() => {
      setRecipes([
        {
          id: 1,
          name: "Bowl Colorido de Quinoa",
          image: "/placeholder.svg",
          calories: 420,
          time: 25,
          steps: [
            "Cozinhe 1 xícara de quinoa em 2 xícaras de água",
            "Grelhe o frango temperado com sal e ervas",
            "Corte os vegetais em cubos pequenos",
            "Monte o bowl com quinoa, frango e vegetais",
            "Finalize com azeite e limão",
          ],
        },
        {
          id: 2,
          name: "Salada Mediterranean",
          image: "/placeholder.svg",
          calories: 320,
          time: 15,
          steps: [
            "Corte tomates, pepino e cebola roxa",
            "Adicione folhas verdes frescas",
            "Tempere com azeite, limão e especiarias",
            "Sirva imediatamente",
          ],
        },
        {
          id: 3,
          name: "Wrap de Frango Integral",
          image: "/placeholder.svg",
          calories: 380,
          time: 20,
          steps: [
            "Aqueça a tortilha integral",
            "Desfie o frango grelhado",
            "Adicione vegetais crocantes",
            "Enrole firmemente e corte ao meio",
            "Sirva com molho natural",
          ],
        },
      ]);
      setGenerating(false);
    }, 2000);
  };

  const addRecipeToDiary = (recipe: Recipe) => {
    toast({
      title: t('recipes.recipeAdded'),
      description: t('recipes.recipeAddedDescription', { name: recipe.name, calories: recipe.calories }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{t('recipes.title')}</h1>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">{t('recipes.whatDoYouHave')}</h2>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              placeholder={t('recipes.inputExample')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addIngredient()}
              className="flex-1"
            />
            <Button onClick={addIngredient} className="bg-gradient-accent">
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <AnimatePresence>
              {ingredients.map((ingredient) => (
                <motion.div
                  key={ingredient}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary/80"
                  >
                    {ingredient}
                    <X
                      className="ml-2 h-3 w-3"
                      onClick={() => removeIngredient(ingredient)}
                    />
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            onClick={generateRecipes}
            disabled={generating}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
            size="lg"
          >
            {generating ? t('recipes.generating') : t('recipes.generateWithAI')}
          </Button>
        </Card>

        {generating && (
          <Card className="p-8 text-center shadow-card">
            <div className="animate-pulse space-y-4">
              <div className="h-40 bg-primary/10 rounded-lg"></div>
              <div className="h-4 bg-primary/10 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-primary/10 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-muted-foreground mt-4">
              {t('recipes.creatingRecipes')}
            </p>
          </Card>
        )}

        <div className="space-y-4">
          <AnimatePresence>
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="overflow-hidden shadow-card hover:shadow-medium transition-smooth">
                  <div className="h-48 bg-gradient-accent relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ChefHat className="h-20 w-20 text-accent-foreground/20" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4" />
                          <span>{recipe.calories} {t('recipes.cal')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.time} {t('recipes.time')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{t('recipes.instructions')}:</h4>
                      <ol className="space-y-2">
                        {recipe.steps.map((step, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <span className="font-medium text-primary min-w-[20px]">
                              {i + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <Button
                      onClick={() => addRecipeToDiary(recipe)}
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      {t('recipes.addToDiary')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default RecipeGenerator;