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

  useEffect(() => {
    const callFunc = async () => {
      console.log('Updating, fetchedAt:', fetchedAt);
      const answer = await func();
      console.log('Got value:', answer);
      setValue(answer);
    };

    callFunc();
  }, [fetchedAt, func]);

  return [value, fetchNow];
};

const getFiles = async () => {
  try {
    return await invoke('update_files_to_diff', {
      pattern: '/Users/edbrannin/dev/pints/content-aggregation-service/**/producer.js'
    })
  } catch (err) {
    console.error('Error updating files to diff', err);
    return [];
  }
};

function App() {
  const [files, triggerUpdateFiles] = useRefreshingEffect(getFiles, []);

  return (
    <div className="App">
      <Body>
        <p>
          {files.length} files
        </p>
        {files.map(({ text, path }) => (
          <p key={text}>{path} says: {text}</p>
        ))}
        <button onClick={triggerUpdateFiles}>Update</button>
      </Body>
    </div>
  );
}

export default App;
