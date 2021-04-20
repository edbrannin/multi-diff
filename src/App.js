import { useRef } from 'react';
import styled from 'styled-components';
import { invoke } from '@tauri-apps/api/tauri';

import { useRefreshingEffect } from './useRefreshingEffect';
import FilesView from './FilesView';

const AppWrapper = styled.div`
  background-color: darkgray;
  margin: 0;
  min-height: 100%;
`;

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
    <AppWrapper>
      {error && (
        <ErrorDisplay>{error.message}</ErrorDisplay>
      )}
      <input ref={pathRef} placeholder="/path/to/dir/**/filename.txt"></input>
      <button onClick={() => triggerUpdateFiles(pathRef.current.value)}>Update</button>
      <FilesView files={files} />
    </AppWrapper>
  );
}

export default App;
