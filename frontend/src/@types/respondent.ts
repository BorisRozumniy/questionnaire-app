type TUserAnswer = {
    answers: string[];
};

export interface IRespondent {
    _id: string;
    name: string;
    answers?: TUserAnswer
}

export interface IState {
    respondents: IRespondent[];
    respondentsError: Error | null;
    respondentsLoading: boolean;
}

export enum ActionKind {
    GET_REQUEST_RESPONDENTS_START = 'GET_REQUEST_RESPONDENTS_START',
    GET_REQUEST_RESPONDENTS_SUCCESS = 'GET_REQUEST_RESPONDENTS_SUCCESS',
    GET_REQUEST_RESPONDENTS_ERROR = 'GET_REQUEST_RESPONDENTS_ERROR',
    POST_REQUEST_CREATE_RESPONDENT_START = 'POST_REQUEST_CREATE_RESPONDENT_START',
    POST_REQUEST_CREATE_RESPONDENT_SUCCESS = 'POST_REQUEST_CREATE_RESPONDENT_SUCCESS',
    POST_REQUEST_CREATE_RESPONDENT_ERROR = 'POST_REQUEST_CREATE_RESPONDENT_ERROR',
}

export type ACTIONTYPE =
    | { type: ActionKind.GET_REQUEST_RESPONDENTS_START }
    | { type: ActionKind.GET_REQUEST_RESPONDENTS_SUCCESS; payload: IRespondent[] }
    | { type: ActionKind.GET_REQUEST_RESPONDENTS_ERROR; payload: any }
    | { type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_START }
    | { type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_SUCCESS; payload: IRespondent[] }
    | { type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_ERROR; payload: any };
