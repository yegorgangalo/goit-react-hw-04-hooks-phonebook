import { useState, useEffect, useRef } from 'react';

export function useLocalStorage (key, defaultValue, callback) {
      const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) ?? defaultValue);
      const isFirstRender = useRef(true);
      const oldState = useRef(state);

      useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }
        state > oldState.current && callback();
        oldState.current = [...state];
        localStorage.setItem(key, JSON.stringify(state));
    },[key, state, callback])

      return [state, setState];
    }