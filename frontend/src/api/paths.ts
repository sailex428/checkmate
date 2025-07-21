export const API_PATH = {
  //endpoints server
  LOGIN: "/api/login",
  SESSION: "/api/session",
  MATCH_REQUEST: "/app/match/request",
  GAME_MOVE: `/app/game/{param}/move`,

  //client need to subscribe to
  MATCH_UPDATE: "/match/update",
  MATCH_ERRORS: "/match/errors",
  MOVE_UPDATE: "/move/update",
  GAME_STATE: "/game/state",
  GAME_ERRORS: "/game/move/errors",
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
