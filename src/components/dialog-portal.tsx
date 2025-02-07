import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { X, Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/api";

interface PropsInterface {
  topics: string[];
  setTopics: Dispatch<SetStateAction<string[]>>;
  setClicked: Dispatch<SetStateAction<boolean>>;
  setNewstellerId: Dispatch<SetStateAction<string>>;
  handleToggle: (option: string, checked: boolean) => void;
}

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

const DialogPortal = (props: PropsInterface) => {
  const mutation = useMutation({
    mutationFn: api.postNewstellerTopics,
    onSuccess: async (data) => {
      props.setNewstellerId(data.task_id);
    },
  });

  const handleClick = () => {
    console.log({ topics: props.topics, language: "pt" });

    mutation.mutate({
      language: "pt",
      topics: props.topics,
    });

    props.setTopics([]);
    props.setClicked(true);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 p-6 rounded-lg shadow-lg w-80 text-white"
        aria-description=""
      >
        <div className="flex justify-between items-center">
          <Dialog.Title className="text-lg font-semibold">
            Selecione os temas
          </Dialog.Title>

          <Dialog.Close asChild>
            <button className="text-gray-400 hover:text-gray-200">
              <X size={20} />
            </button>
          </Dialog.Close>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <Checkbox.Root
                className="w-5 h-5 bg-zinc-700 border border-zinc-500 rounded flex items-center justify-center"
                checked={props.topics.includes(option)}
                onCheckedChange={(checked) =>
                  props.handleToggle(option, checked as boolean)
                }
              >
                <Checkbox.Indicator>
                  <Check className="text-white" size={16} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              {option}
            </label>
          ))}
        </div>

        <div className="mt-4 text-sm">
          <strong>Selecionados:</strong>{" "}
          {props.topics.length > 0 ? props.topics.join(", ") : "Nenhum"}
        </div>

        <Dialog.Close asChild>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed"
            onClick={handleClick}
            disabled={props.topics.length === 0}
          >
            Assinar newsteller com os temas selecionados
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default DialogPortal;
