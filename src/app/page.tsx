import { useState } from "react";

const OPTIONS = [
  "Inteligência artificial",
  "Mudanças climáticas",
  "Tecnologia",
  "Finanças",
  "Saúde",
  "Entretenimento",
  "Esportes",
  "Educação",
];

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleToggleOption = (option: string) => {
    setSelectedTopics((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 min-h-screen flex justify-center items-center">
      <main className="bg-zinc-800 p-4">
        <h1 className="font-bold">Newsteller</h1>
        <h2 className="font-semibold">
          Conte pra gente, quais temas de newsteller te interessam mais?
        </h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
              Escolher temas
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 p-6 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2">Selecione os temas</h3>
            <div className="flex flex-col gap-2">
              {OPTIONS.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedTopics.includes(option)}
                    onCheckedChange={() => handleToggleOption(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="mt-4">
              <strong>Selecionados:</strong>{" "}
              {selectedTopics.length > 0 ? selectedTopics.join(", ") : "Nenhum"}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
