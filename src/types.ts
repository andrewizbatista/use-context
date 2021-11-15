import { Dispatch, SetStateAction } from 'react';

/**
 * State
 */
export type State = Record<string, unknown>;

/**
 * Actions
 */
export type Actions = Record<string, unknown>;

/**
 * ContextSchema
 */
export interface ContextSchema<S extends State, A extends Actions> {
  initialState: S;
  actions: (contextState: { state: S; setState: Dispatch<SetStateAction<S>> }) => A;
}

/**
 * ContextType
 */
export interface ContextType<S extends State, A extends Actions> {
  state: S;
  actions: A;
}
