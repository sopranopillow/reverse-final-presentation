import React from 'react';
import * as styles from './App.styles';
import * as grades from './grades/grades.json';

function App() {
  return (
    <div styles={styles.App}>
      <p>
        {JSON.stringify(grades)}
      </p>
    </div>
  );
}

export default App;
