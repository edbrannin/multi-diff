import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { invoke } from '@tauri-apps/api/tauri';

const Body = styled.div`
  background-color: darkgray;
  margin: 0;
`;

const useRefreshingEffect = (func, defaultValue) => {
  const [fetchedAt, setFetchedAt] = useState(Date.now());
  const [args, setArgs] = useState([]);
  const fetchNow = (...newArgs) => {
    setFetchedAt(Date.now());
    setArgs(newArgs);
  }
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callFunc = async () => {
      console.log('Updating, fetchedAt:', fetchedAt);
      try {
        const answer = await func(...args);
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
  }, [fetchedAt, func, args]);

  return [value, fetchNow, error];
};

const getFiles = async (pattern) => {
  console.log('Updating files with pattern:', pattern);
  return await invoke('update_files_to_diff', {
    pattern,
  })
};

const ErrorDisplay = styled.div`
  white-space: pre-wrap;
  font-family: 'FiraCode Nerd Font', monospace;
  background-color: pink;
`;

function App() {
  const [files, triggerUpdateFiles, error] = useRefreshingEffect(getFiles, []);
  const pathRef = useRef();

  return (
    <div className="App">
      <Body>
        {error && (
          <ErrorDisplay>{error.message}</ErrorDisplay>
        )}
        <input ref={pathRef} placeholder="/path/to/dir/**/filename.txt"></input>
        <button onClick={() => triggerUpdateFiles(pathRef.current.value)}>Update</button>
        {files && (
          <div>
            <p>
              {files && files.length} files
          </p>
            {files.map(({ text, path }) => (
              <p key={text}>{path} says: {text}</p>
            ))}
          </div>
        )}
      </Body>
    </div>
  );
}

export default App;
