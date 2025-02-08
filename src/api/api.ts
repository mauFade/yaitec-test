import axios from "axios";
import {
  NewstellerStatusResponse,
  TopicRequestInterface,
  TopicResponseInterface,
} from "./dto/topics";

class Api {
  public async postNewstellerTopics(
    data: TopicRequestInterface
  ): Promise<TopicResponseInterface> {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const formData = new FormData();
    formData.append("topics", data.topics.join(","));
    formData.append("language", data.language);

    const response = await axiosInstance.post<TopicResponseInterface>(
      "/generate-newsletter",
      formData
    );

    return response.data;
  }

  public async getNewstellerStatus(
    id: string
  ): Promise<NewstellerStatusResponse> {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const response = await axiosInstance.get<NewstellerStatusResponse>(
      `/tasks/${id}`
    );

    return response.data;
  }
}

export const api = new Api();
