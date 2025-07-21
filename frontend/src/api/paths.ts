export const API_PATH = {
  //endpoints server
  LOGIN: "/api/login",
  SESSION: "/api/session",
  MATCH_REQUEST: "/app/match/request",
  GAME_MOVE: `/app/game/{param}/move`,

  //client need to subscribe to
  MATCH_UPDATE: "/user/queue/match/update",
  MATCH_ERRORS: "/user/queue/match/errors",
  MOVE_UPDATE: "/user/queue/move/update",
  GAME_STATE: "/user/queue/game/state",
  GAME_ERRORS: "/user/queue/game/move/errors",
};

export const formatApiPath = (
  apiPath: string,
  placeHolder?: string,
): string => {
  if (placeHolder) {
    return apiPath.replace("{param}", placeHolder);
  }
  return apiPath;
};
