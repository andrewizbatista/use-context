import React, { useState, useMemo } from 'react';
import { State, Actions, ContextSchema, ContextType, ProviderType } from '../types';

/**
 * React Component that handles all the logic of a Context Provider.
 */
export const ContextProvider = <S extends State, A extends Actions>({
  schema: { initialState, actions },
  Context,
  children,
}: ContextProviderProps<S, A>) => {
  /**
   * ContextValue Type
   */
  type ContextValue = ContextType<S, A>;

  /**
   * State
   */
  const [state, setState] = useState<ContextValue['state']>(initialState);

  /**
   * Context Value
   */
  const contextValue = useMemo<ContextValue>(
    () => ({
      state,
      actions: actions({ state, setState }),
    }),
    [state],
  );

  return (
    <Context.Provider value={contextValue}>
      {typeof children === 'function' ? children({ state }) : children}
    </Context.Provider>
  );
};

interface ContextProviderProps<S extends State, A extends Actions> extends ProviderType<S> {
  schema: ContextSchema<S, A>;
  Context: React.Context<ContextType<S, A>>;
}
