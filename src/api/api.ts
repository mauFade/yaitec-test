import {
  NewstellerStatusResponse,
  TopicRequestInterface,
  TopicResponseInterface,
} from "./dto/topics";

class Api {
  public async postNewstellerTopics(
    data: TopicRequestInterface
  ): Promise<TopicResponseInterface> {
    const httpUrl = "http://74.179.83.201:8000/generate-newsletter";

    const response = await fetch(httpUrl, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const r = await response.json();

    return r;
  }

  public async getNewstellerStatus(
    id: string
  ): Promise<NewstellerStatusResponse> {
    const httpUrl = "http://74.179.83.201:8000/topics/" + id;

    const response = await fetch(httpUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const r = await response.json();

    return r;
  }
}

export const api = new Api();
