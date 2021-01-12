import { useState, useEffect } from 'react';

export function useLocalStorage (key, defaultValue) {
      const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) ?? defaultValue);

      useEffect(() => {
      // contacts!==0 && toggleModal();
      localStorage.setItem(key, JSON.stringify(state));
    },[key, state])

      return [state, setState];
    }