"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogPortal from "@/components/dialog-portal";

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleToggleOption = (option: string, checked: boolean) => {
    setSelectedTopics((prev) =>
      checked ? [...prev, option] : prev.filter((item) => item !== option)
    );
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 min-h-screen flex flex-col space-y-6 justify-center items-center">
      <main className="bg-zinc-800 p-4 rounded-md">
        <h1 className="font-bold">Newsteller</h1>
        <h2 className="font-semibold">
          Conte pra gente, quais temas de newsteller te interessam mais?
        </h2>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Escolher temas
            </button>
          </Dialog.Trigger>

          <DialogPortal
            handleToggle={handleToggleOption}
            topics={selectedTopics}
            setTopics={setSelectedTopics}
            setClicked={setClicked}
          />
        </Dialog.Root>
      </main>

      {clicked && <div className="bg-zinc-800 p-4 rounded-md">CLICOU</div>}
    </div>
  );
}
