import { useState } from 'react';

import styled from 'styled-components';
import commonPathPrefix from 'common-path-prefix';

import FileView from './FileView';
import SelectedFilesDiff from './SelectedFilesDiff';

const extractCommonRoot = (files) => {
  const commonRoot = commonPathPrefix(files.map(({ path }) => path));
  const shortPathFiles = files.map(({ path, ...more }) => ({
    path: path.slice(commonRoot.length),
    ...more,
  }));
  return {
    commonRoot,
    shortPathFiles,
  };
};

const combineIndenticalFiles = (files) => {
  const combinedFilesMap = new Map();
  files.forEach(({ path, text }) => {
    if (combinedFilesMap.has(text)) {
      combinedFilesMap.get(text).push(path);
    } else {
      combinedFilesMap.set(text, [path]);
    }
  });
  const combinedFiles = [];
  combinedFilesMap.forEach((paths, text) => combinedFiles.push({ text, paths }))
  return { combinedFiles }
};

const FilesView = ({ files }) => {
  const [selectedPaths, setSelectedPaths] = useState([]);
  const selectPath = (path) => setSelectedPaths([...selectedPaths, path]);
  const deselectPath = (path) => setSelectedPaths(selectedPaths.filter(item => item !== path));
  if (!files) {
    return <div/>;
  }

  console.log('selectedPaths', selectedPaths);
  const { shortPathFiles, commonRoot } = extractCommonRoot(files);
  const { combinedFiles } = combineIndenticalFiles(shortPathFiles);

  return (
    <div>
      <p>
        {shortPathFiles.length} files in <code>{commonRoot}</code>
      </p>
      <SelectedFilesDiff files={shortPathFiles} selectedFiles={selectedPaths} />
      {combinedFiles.map(({ text, paths }) => (
        <FileView key={text} text={text} paths={paths} selectPath={selectPath} deselectPath={deselectPath} />
      ))}
    </div>
  )
}

export default FilesView;
