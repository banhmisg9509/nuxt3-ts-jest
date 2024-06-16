# Config jest with nuxt 3

### Dependencies: 

```
npm i -D @babel/core @babel/preset-env @babel/preset-typescript babel-jest @types/jest jest jest-environment-jsdom @vue/test-utils @vue/vue3-jest

```

These packages are needed for jest to transform and run *.spec.ts files

* "@babel/core": "^7.24.7"
* "@babel/preset-env": "^7.24.7"
* "@babel/preset-typescript": "^7.24.7"
* "babel-jest": "^29.7.0",

These packages are needed to setup testing environment and jest types

* "@types/jest": "^29.5.12",
* "jest": "^29.7.0",
* "jest-environment-jsdom": "^29.7.0"

There packages are needed for jest to transform and run *.vue files, also utilities needed for vue testing. 

* "@vue/test-utils": "^2.4.6",
* "@vue/vue3-jest": "^29.2.6",


### Configuration files

Create or modify these files:

``` 
// jest.config.cjs

module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1",
    "^~/(.*)": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(ts)$": "babel-jest",
    ".*\\.(vue)$": "@vue/vue3-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(nuxt3|unenv))"],
};
```

```
// babel.config.cjs

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
};
```

```
// tsconfig.json

{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "types": [
      "jest"
    ]
  }
}
```


```
// package.json

{
  ...
  "scripts": {
    ...
    "test": "jest"
  },
  ...
}

```

### Demo testing

Create DemoComponent.vue in components folder and DemoComponent.spec.ts in tests folder

```
// components/DemoComponent.vue

<template>
    <h1>This is a text</h1>
</template>
```

```
// tests/DemoComponent.spec.ts

import { mount, shallowMount } from "@vue/test-utils";
import DemoComponent from "~/components/DemoComponent.vue";

function mountComponent<T>(component: T) {
  return mount(component);
}

type WrapperType<T> = ReturnType<typeof mountComponent<T>>;

describe("DemoComponent", () => {
  let wrapper: WrapperType<typeof DemoComponent>;

  beforeEach(() => {
    wrapper = shallowMount(DemoComponent);
  });

  test("render DemoComponent", () => {
    expect(wrapper.text()).toContain("This is a text");
  });
});

```

### Use @swc/jest instead of babel-jest to transform test faster

1) Install @swc/jest and @swc/core packages, you don't need @babel/typescript and babel-jest anymore.
2) Modify babel.config.cjs file:

```
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
```

3) Modify jest.config.cjs file:

```
module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1",
    "^~/(.*)": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(ts)$": "@swc/jest",
    ".*\\.(vue)$": "@vue/vue3-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(nuxt3|unenv))"],
};
```
```