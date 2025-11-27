import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ArrowLeft, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface DetectedFood {
  name: string;
  portion: number;
  calories: number;
  unit: string;
}

const FoodPhoto = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<DetectedFood[]>([]);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        simulateDetection();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateDetection = () => {
    setDetecting(true);
    setTimeout(() => {
      setDetectedFoods([
        { name: "Arroz Integral", portion: 1, calories: 216, unit: "xícara" },
        { name: "Frango Grelhado", portion: 1, calories: 165, unit: "filé (100g)" },
        { name: "Brócolis", portion: 1, calories: 55, unit: "xícara" },
        { name: "Azeite", portion: 1, calories: 40, unit: "colher" },
      ]);
      setDetecting(false);
    }, 2000);
  };

  const updatePortion = (index: number, newPortion: number) => {
    const updated = [...detectedFoods];
    const baseCalories = updated[index].calories / updated[index].portion;
    updated[index].portion = newPortion;
    updated[index].calories = Math.round(baseCalories * newPortion);
    setDetectedFoods(updated);
  };

  const totalCalories = detectedFoods.reduce((sum, food) => sum + food.calories, 0);

  const handleAddToDiary = () => {
    toast({
      title: "Refeição adicionada!",
      description: `${totalCalories} calorias registradas no seu diário`,
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Foto da Comida</h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {!image ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <Card className="p-12 bg-card shadow-card">
              <Camera className="h-20 w-20 mx-auto mb-6 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Tire uma foto da refeição</h2>
              <p className="text-muted-foreground mb-6">
                Nossa IA identificará os alimentos e calculará as calorias automaticamente
              </p>
              <label htmlFor="photo-input">
                <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
                  <Camera className="mr-2 h-5 w-5" />
                  Abrir Câmera
                </Button>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageCapture}
                />
              </label>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card className="overflow-hidden shadow-card">
              <img
                src={image}
                alt="Refeição capturada"
                className="w-full h-64 object-cover"
              />
            </Card>

            {detecting ? (
              <Card className="p-8 text-center shadow-card">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-primary/20 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-primary/20 rounded w-1/2 mx-auto"></div>
                </div>
                <p className="text-muted-foreground mt-4">Analisando imagem...</p>
              </Card>
            ) : (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Alimentos Detectados</h3>
                  {detectedFoods.map((food, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 shadow-soft hover:shadow-medium transition-smooth">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{food.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {food.portion} {food.unit}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-semibold text-primary">
                              {food.calories}
                            </p>
                            <p className="text-xs text-muted-foreground">calorias</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updatePortion(index, Math.max(0.25, food.portion - 0.25))
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Slider
                            value={[food.portion]}
                            onValueChange={([value]) => updatePortion(index, value)}
                            min={0.25}
                            max={3}
                            step={0.25}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updatePortion(index, Math.min(3, food.portion + 0.25))
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-medium">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium">Total de Calorias</span>
                    <span className="text-3xl font-bold">{totalCalories}</span>
                  </div>
                  <Button
                    onClick={handleAddToDiary}
                    className="w-full bg-card text-card-foreground hover:bg-card/90"
                    size="lg"
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Adicionar ao Diário
                  </Button>
                </Card>
              </>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default FoodPhoto;
