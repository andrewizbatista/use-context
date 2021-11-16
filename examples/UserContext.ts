// UserContext.ts

import { createContextFromSchema, State, Actions, ContextSchema } from '../src';

/**
 * Step 1: Define the `State` interface.
 *
 * This interface should represent the `state` object.
 */
export interface UserState extends State {
  id: number;
  username: string;
  email: string;
}

/**
 * Step 2: Define the `Actions` interface.
 *
 * This interface should represent all the functions/methods
 * of your context.
 */
export interface UserActions extends Actions {
  fetchUser: (id: number) => void;
  getFormattedUserLine: () => string;
}

/**
 * Step 3: Create the `schema`
 *
 * This schema is the heart of everything, define its initial state
 * and all the actions.
 */
const schema: ContextSchema<UserState, UserActions> = {
  initialState: {
    id: 0,
    username: '',
    email: '',
  },
  actions: ({ state, setState }) => ({
    /**
     * Fetches a user from a mocked API
     */
    fetchUser: (id) =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => setState(data as UserState)),
    /**
     * Returns a formatted string that contains the `username` and the `email`
     */
    getFormattedUserLine: () => `${state.username} <${state.email}>`,
  }),
};

/**
 * Step 4: Create your context based on the `schema`
 *
 * Call the `createContextFromSchema` so it can generate the `Context`,
 * the `Provider` a `useContext` hook.
 *
 * Tip: In ES6 you can rename your object keys!
 */
export const {
  Context: UserContext,
  Provider: UserProvider,
  useContext: useUser,
} = createContextFromSchema<UserState, UserActions>(schema);
