import React, { createContext, useContext } from 'react';
import { ContextProvider } from './ContextProvider';
import {
  State,
  Actions,
  ContextSchema,
  ContextType,
  ProviderType,
  CreateContextFromSchema,
} from '../types';

/**
 * Function that creates a React `Context` and its respective `useContext` hook based on a `schema`.
 */
export const createContextFromSchema = <S extends State, A extends Actions>(
  schema: ContextSchema<S, A>,
): CreateContextFromSchema<S, A> => {
  const { initialState, actions } = schema;

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
   * Provider
   */
  const Provider = ({ children }: ProviderType<S>) => (
    <ContextProvider<S, A> schema={schema} Context={Context}>
      {children}
    </ContextProvider>
  );

  /**
   * Context & useContext
   */
  return {
    Context,
    Provider,
    useContext: () => useContext<ContextValue>(Context),
  };
};
