import { createContext, useContext, Context as ReactContext } from 'react';
import { State, Actions, ContextSchema, ContextType } from './types';

/**
 * Function that creates a React `Context` and its respective `useContext` hook based on a `schema`.
 */
export const createContextFromSchema = <S extends State, A extends Actions>({
  initialState,
  actions,
}: ContextSchema<S, A>): CreateContextFromSchema<S, A> => {
  /**
   * ContextValue Type
   */
  type ContextValue = ContextType<S, A>;

  /**
   * Initial Context Value
   */
  const contextValue: ContextValue = {
    state: initialState,
    actions: actions({ state: initialState, setState: () => undefined }),
  };

  /**
   * Context
   */
  const Context = createContext<ContextValue>(contextValue);

  /**
   * Context & useContext
   */
  return {
    Context,
    useContext: () => useContext<ContextValue>(Context),
  };
};

interface CreateContextFromSchema<S extends State, A extends Actions> {
  Context: ReactContext<ContextType<S, A>>;
  useContext: () => ContextType<S, A>;
}
