import { useEffect, useState } from 'react';
import styled from 'styled-components';

const getInvoke = () => {
  if (window.__TAURI__) {
    return window.__TAURI__.invoke;
  }
  return (...args) => {
    console.warn(`invoke is missing!  ${args}`);
    return [];
  }
}
const invoke = getInvoke();

const Body = styled.div`
  background-color: darkgray;
  margin: 0;
`;

const useRefreshingEffect = (func, defaultValue) => {
  const [fetchedAt, setFetchedAt] = useState(Date.now());
  const fetchNow = () => setFetchedAt(Date.now());
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callFunc = async () => {
      console.log('Updating, fetchedAt:', fetchedAt);
      try {
        const answer = await func();
        console.log('Got value:', answer);
        setValue(answer);
      }
      catch (err) {
        console.error('Error:', err);
        setValue(null);
        setError(err);
      }
    };

    callFunc();
  }, [fetchedAt, func]);

  return [value, fetchNow, error];
};

const getFiles = async () => {
  return await invoke('update_files_to_diff', {
    pattern: '/redacted/**/producer.js'
  })
};

const ErrorDisplay = styled.div`
  white-space: pre-wrap;
  font-family: 'FiraCode Nerd Font', monospace;
  background-color: pink;
`;

function App() {
  const [files, triggerUpdateFiles, error] = useRefreshingEffect(getFiles, []);

  return (
    <div className="App">
      <Body>
        {error && (
          <ErrorDisplay>{error.message}</ErrorDisplay>
        )}
        <p>
          {files && files.length} files
        </p>
        {files && files.map(({ text, path }) => (
          <p key={text}>{path} says: {text}</p>
        ))}
        <button onClick={triggerUpdateFiles}>Update</button>
      </Body>
    </div>
  );
}

export default App;
