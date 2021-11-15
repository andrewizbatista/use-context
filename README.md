<div align="center">

# `create-context`

A streamlined way of creating React Context(s) based on a schema. Easy to use and with 0 dependencies (except React).

![create-context version](https://img.shields.io/npm/v/@andrewizbatista/create-context?style=flat-square&color=yellow&label=NPM) ![create-context minified size](https://img.shields.io/bundlephobia/min/@andrewizbatista/create-context?style=flat-square&color=blue&label=Minified+Size) ![create-context license](https://img.shields.io/npm/l/@andrewizbatista/create-context?style=flat-square&color=green&label=License)

![created by @andrewizbatista](https://img.shields.io/badge/Created%20By-@andrewizbatista-crimson?style=flat-square)

</div>

## <a name="index"></a>Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Basic Example](#usage/basic)
  - [Advanced Example](#usage/advanced)
- [Contributing](#contributing)
- [License](#license)

## <a name="getting-started"></a>Getting Started

#### [`yarn`](https://yarnpkg.com/package/@andrewizbatista/create-context)

```
yarn add @andrewizbatista/create-context
```

#### [`npm`](https://www.npmjs.com/package/@andrewizbatista/create-context)

```
npm install @andrewizbatista/create-context
```

## <a name="usage"></a>Usage

### <a name="usage/basic"></a>Basic Example (`UserContext`)

```tsx
// UserContext.tsx

import React, { ReactNode } from 'react';
import {
  createContextFromSchema,
  State,
  Actions,
  ContextProvider,
  ContextSchema,
} from '@andrewizbatista/create-context';

/**
 * Step 1
 *
 * Define the `State` and `Actions` interfaces so you
 * can have a proper typed experience.
 */
export interface UserState extends State {
  id: number;
  username: string;
  email: string;
}

export interface UserActions extends Actions {
  fetchUser: (id: number) => void;
  getFormattedUserLine: () => string;
}

/**
 * Step 2
 *
 * Define the `schema` of the Context you want to create.
 */
const schema: ContextSchema<UserState, UserActions> = {
  initialState: {
    id: 0,
    username: '',
    email: '',
  },
  actions: ({ state, setState }) => ({
    // Fetches a user from a mocked API and set the state
    fetchUser: (id) =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => setState(data as UserState)),
    // Returns a string that contains the `username` and `email` of the user
    getFormattedUserLine: () => `${state.username} <${state.email}>`,
  }),
};

/**
 * Step 3
 *
 * Use the `createContextFromSchema` to generate a `Context`
 * and its respective `useContext` hook.
 *
 * Tip: In ES6 you can rename your object keys!
 */
export const { Context: UserContext, useContext: useUserContext } = createContextFromSchema<
  UserState,
  UserActions
>(schema);

/**
 * Step 4
 *
 * Create a `Provider` based on a `ContextProvider<State, Actions>` so it can
 * handle all the `state` logic.
 */
export const UserProvider = ({ children }: UserProviderProps) => (
  <ContextProvider<UserState, UserActions> schema={schema} Context={UserContext}>
    {children}
  </ContextProvider>
);
export interface UserProviderProps {
  children: ReactNode;
}
```

### <a name="usage/advanced"></a>Advanced Example (`UserContext`)

In some cases you might want to have a **child Context/Provider** that uses the **parent State** as a value. For those cases you can pass a **render function as the children and use it to render the child Context/Provider**.

```tsx
// Example where the `UserPermissionsProvider` needs the `state` (user) from the parent `Context`

export const UserProvider = ({ children }: UserProviderProps) => (
  <ContextProvider<State, Actions> schema={schema} Context={UserContext}>
    {({ state }) => <UserPermissionsProvider value={state}>{children}</UserPermissionsProvider>}
  </ContextProvider>
);
```

## <a name="contributing"></a>Contributing

Want to help? Feel free to open an [Issue](https://github.com/andrewizbatista/create-context/issues) or create a [Pull Request](https://github.com/andrewizbatista/create-context/pulls) and let's get started 🚀

## <a name="license"></a>License

[MIT](https://github.com/andrewizbatista/create-context/blob/main/LICENSE) © André Batista ([@andrewizbatista](https://github.com/andrewizbatista))
