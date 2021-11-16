<div align="center">

# `context-schema`

A streamlined way of creating a `React.Context` based on a `schema`. Easy to use and with `0` dependencies.

![context-schema version](https://img.shields.io/npm/v/@andrewizbatista/context-schema?style=flat-square&color=yellow&label=NPM) ![context-schema minified size](https://img.shields.io/bundlephobia/min/@andrewizbatista/context-schema?style=flat-square&color=blue&label=Minified+Size) ![context-schema license](https://img.shields.io/npm/l/@andrewizbatista/context-schema?style=flat-square&color=green&label=License)

![created by @andrewizbatista](https://img.shields.io/badge/Created%20By-@andrewizbatista-crimson?style=flat-square)

</div>

## <a name="index"></a>Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
  - [1. Creating your Context file](#usage/1)
  - [2. Understanding the `exports`](#usage/2)
  - [3. Initializing the `Provider`](#usage/3)
  - [4. Using the Context](#usage/4)
- [Contributing](#contributing)
- [License](#license)

## <a name="getting-started"></a>Getting Started

#### [`yarn`](https://yarnpkg.com/package/@andrewizbatista/context-schema)

```
yarn add @andrewizbatista/context-schema
```

#### [`npm`](https://www.npmjs.com/package/@andrewizbatista/context-schema)

```
npm install @andrewizbatista/context-schema
```

## <a name="usage"></a>Usage

In the following steps we are going to use a `UserContext` example. You can see more examples in the [`/examples`](https://github.com/andrewizbatista/context-schema/tree/main/examples) folder.

### <a name="usage/1"></a>1. Creating your Context file

First step is for you to create your context file. This file will export all the things you need to set and use that you just defined.

In the example below it's a simple context that fetches and saves a user object.

```ts
// UserContext.ts

import {
  createContextFromSchema,
  State,
  Actions,
  ContextSchema,
} from '@andrewizbatista/context-schema';

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
```

---

### <a name="usage/2"></a>2. Understanding the `exports`

The context file should have a few `exports` so you can import them across your app.

```ts
import {
  /**
   * The TypeScript interface of your `state`
   */
  UserState,
  /**
   * The TypeScript interface of your `actions`
   */
  UserActions,
  /**
   * The original React Context component (you shouldn't need to use this,
   * because of the Provider below).
   */
  UserContext,
  /**
   * A smart React Context.Provider that handles all the state
   * update/render logic
   */
  UserProvider,
  /**
   * A `useContext` hook to allow you to access the context anywhere
   */
  useUser,
} from './UserContext';
```

---

### <a name="usage/3"></a>3. Initializing the `Provider`

Now that you have everything setup, you just need to wrap your app/component with the `UserProvider`.

```tsx
/**
 * Basic example of wrapping your app with the provider
 */
import { UserProvider } from 'contexts/UserContext';

const App = () => (
  <UserProvider>
    <Navbar />
    <Content />
    <Footer />
  </UserProvider>
);
```

If you have a child `Context` that is dependent on the `state` of the parent one. Pass a render function as the `children` so you have access to the `state` object.

```tsx
/**
 * Example where the child provider (`AuthenticationProvider`) is dependent
 * on the `state` of the parent provider (`UserProvider`)
 */
import { UserProvider } from 'contexts/UserContext';
import { AuthenticationProvider } from 'contexts/AuthenticationProvider'; // Just as an example

const App = () => (
  <UserProvider>
    {({ state: userState }) => (
      <AuthenticationProvider value={userState}>
        <Navbar />
        <Content />
        <Footer />
      </AuthenticationProvider>
    )}
  </UserProvider>
);
```

---

### <a name="usage/4"></a>4. Using the Context

You can access your context anywhere in your app by using the `useUser` hook

```tsx
import { useEffect } from 'react';
import { useUser } from 'contexts/UserContext';

const MyUser = (userId: number) => {
  /**
   * Accessing both the `state` and `actions`
   * of your context.
   */
  const {
    state: { username, email },
    actions: { fetchUser },
  } = useUser();

  /**
   * Calling `fetchUser` inside a `useEffect`
   */
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  /**
   * Rendering some `state` props
   */
  return (
    <Box>
      <Text>{username}</Text>
      <Text>{email}</Text>
    </Box>
  );
};
```

## <a name="contributing"></a>Contributing

Want to help? Feel free to open an [Issue](https://github.com/andrewizbatista/context-schema/issues) or create a [Pull Request](https://github.com/andrewizbatista/context-schema/pulls) and let's get started 🚀

## <a name="license"></a>License

[MIT](https://github.com/andrewizbatista/context-schema/blob/main/LICENSE) © André Batista ([@andrewizbatista](https://github.com/andrewizbatista))
