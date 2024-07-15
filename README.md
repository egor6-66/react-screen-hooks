# 📺 react-screen-hooks

![version](https://img.shields.io/github/package-json/v/egor6-66/react-screen-hooks)
![stars](https://img.shields.io/github/stars/egor6-66/react-screen-hooks?style=social)
![forks](https://img.shields.io/github/forks/egor6-66/react-screen-hooks?style=social)
![last commit](https://img.shields.io/github/last-commit/egor6-66/react-screen-hooks/main)
![code size](https://img.shields.io/github/languages/code-size/egor6-66/react-screen-hooks)
![minzip size](https://img.shields.io/bundlephobia/minzip/react-screen-hooks)
![download](https://img.shields.io/npm/dt/react-screen-hooks)

**Description** - 🔎 Wrapper over package [zustand](https://www.npmjs.com/package/zustand). Shortens the code, provides hook that returns setter and getter, convenient to work with typescript.

[//]: # (## [🚀🚀🚀DEMO🚀🚀🚀]&#40;https://codesandbox.io/s/react-use-file-uploader-88uh7o&#41;)

## 💿 Installation

```
npm i react-screen-hooks
```

## 💻 Example 
### useSizeObserver
**useSizeObserver is used to monitor the size of the element, the watch parameter determines at what change onResize will fire, the default observer for all, can be configured for width only or height only. If you do not pass the ref, the dimensions of the body tag will be returned.**
```jsx
import { useSizeObserver } from 'react-screen-hooks';

function App() {
  const ref = useRef<HTMLDivElement | null>(null);

  useSizeObserver({
    ref,
    debounceDelay: 2000,
    onResize: (size) => {
      console.log(size);
    },
  });

  return (
    <div ref={ref} style={{ width: '70%', height: '70%' }}>
      =)))))))))))))
    </div>
  );
}
```
### useWindowSizeObserver
**useWindowSizeObserver returns the size of the element, you can pass a realtime parameter, defaults to true and debounce.**
```jsx
import { useWindowSizeObserver } from 'react-screen-hooks';

function App() {
  const { width, height } = useWindowSizeObserver({
    debounce: 2000
  });

  console.log(width, height);

  return <div>=)))))))))))))</div>;
}
```
### useElementSizeObserver
**useElementSizeObserver returns the window size, you can pass  realtime parameter, by default true and debounce.**
```jsx
import { useElementSizeObserver } from 'react-screen-hooks';

function App() {
  const [ref, size] = useElementSizeObserver({
    debounce: 2000
  });

  console.log(size.width, size.height);

  return (
    <div style={{ width: '70%', height: '70%' }} ref={ref}>
      =)))))))))))))
    </div>
  );
}
```
### configMediaQuery
**configMediaQuery will return two hooks that will track your breakpoints.**
```jsx
import { configMediaQuery } from 'react-screen-hooks';

const { useHeightMediaQuery, useWidthMediaQuery } = configMediaQuery({
  widthBreakpoints: {
    sm: 600,
    md: 900,
  },
  heightBreakpoints: {
    sm: 600,
    md: 900,
  },
});

function App() {
  const height = useHeightMediaQuery();
  const width = useWidthMediaQuery();

  return (
    <div style={{ width: '70%', height: '70%' }}>
      <div>{height.from('md') ? 'height > md' : 'height < md'}</div>
      <div>{width.to('sm') ? 'width < sm' : 'width > sm'}</div>
    </div>
  );
}
```