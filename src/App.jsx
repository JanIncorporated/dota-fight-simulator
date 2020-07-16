import React, { useEffect } from 'react';
import { main } from './fight';

export const App = () => {
  useEffect(() => {
    main();
  }, []);

  return (
    <h1>Dota Fight Simulator</h1>
  );
};
