import { Client, type IPublishParams } from "@stomp/stompjs";
import { formatApiPath } from "./paths.ts";

const WEBSOCKET_BACKEND_URL: string = import.meta.env
  .VITE_WEBSOCKET_BACKEND_URL;

export const GAME_ID = "gameId";

export const initStompClient = () => {
  return new Client({
    brokerURL: WEBSOCKET_BACKEND_URL,
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 10000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
};

type PublishMessageProps<T> = {
  client: Client;
  apiPath: string;
  placeHolder?: string;
  body?: T;
};

export const publishMessage = <T>(props: PublishMessageProps<T>) => {
  const payload: IPublishParams = {
    destination: formatApiPath(props.apiPath, props.placeHolder),
  };
  if (props.body) {
    payload.body = JSON.stringify(props.body);
  }
  console.log(payload);
  props.client.publish(payload);
};

type SubscribeProps<T> = {
  client: Client;
  apiPath: string;
  callback: (body: T) => void;
};

export const subscribe = <T>(props: SubscribeProps<T>) => {
  props.client.subscribe(props.apiPath, (message) =>
    props.callback(JSON.parse(message.body) as T),
  );
};
