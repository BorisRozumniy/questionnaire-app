import { TMongoId } from "./common";

type AnswerOptionId = number;
type AnswerTextValue = string;

export type TUserAnswer = { questionId: TMongoId, value?: AnswerOptionId | AnswerTextValue };

type TQuestionnaireId = string;

export interface IRespondent {
    _id: string;
    name: string;
    answers?: TUserAnswer[],
    questionnaire: TQuestionnaireId;

}

type AnswerPaiload = { answer: TUserAnswer, respondentId: TMongoId }

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
    PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_START = 'PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_START',
    PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_SUCCESS = 'PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_SUCCESS',
    PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_ERROR = 'PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_ERROR',
}

export type ACTIONTYPE =
    | { type: ActionKind.GET_REQUEST_RESPONDENTS_START }
    | { type: ActionKind.GET_REQUEST_RESPONDENTS_SUCCESS; payload: IRespondent[] }
    | { type: ActionKind.GET_REQUEST_RESPONDENTS_ERROR; payload: any }
    | { type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_START }
    | { type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_SUCCESS; payload: IRespondent }
    | { type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_ERROR; payload: any }
    | { type: ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_START }
    | { type: ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_SUCCESS; payload: AnswerPaiload }
    | { type: ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_ERROR; payload: any };
