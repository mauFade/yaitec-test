import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Markdown from "react-markdown";

interface PropsInterface {
  newstellerId: string;
}
let shouldQuery = true;
const fetchSessions = async (id: string) => {
  const response = await api.getNewstellerStatus(id);
  return response;
};

const NewstellerStatus = (props: PropsInterface) => {
  const { data, isLoading } = useQuery({
    queryKey: ["newsteler", props.newstellerId],
    queryFn: () => fetchSessions(props.newstellerId),
    refetchInterval: () => (shouldQuery ? 5000 : false),
  });

  if (data && data.status === "SUCCESS") {
    shouldQuery = false;
  }

  return (
    <div className="bg-zinc-800 rounded-lg p-6 max-w-md">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <AiOutlineLoading className="text-4xl text-zinc-500 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold text-center mb-4">
            Status da Newsletter
          </h2>
          <p className="text-center text-zinc-400 mb-2">
            Status: <span className="font-semibold">{data?.status}</span>
          </p>
          {data?.result ? (
            <div className="bg-zinc-700 p-4 rounded mt-4">
              <h3 className="text-md font-semibold text-zinc-400">Conteúdo:</h3>
              <Markdown className="text-zinc-300 mt-2 max-w-md">
                {data?.result?.content}
              </Markdown>
            </div>
          ) : (
            <AiOutlineLoading className="text-4xl text-zinc-500 animate-spin" />
          )}

          {data?.error && (
            <p className="text-red-500 mt-4 text-center">Erro: {data.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewstellerStatus;
