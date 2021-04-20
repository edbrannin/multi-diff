import styled from 'styled-components';
import commonPathPrefix from 'common-path-prefix';

import FileView from './FileView';

const combineIndenticalFiles = (files) => {
  const commonRoot = commonPathPrefix(files.map(({ path }) => path));
  const combinedFilesMap = new Map();
  files.forEach(({ path, text }) => {
    const shortPath = path.slice(commonRoot.length);
    if (combinedFilesMap.has(text)) {
      combinedFilesMap.get(text).push(shortPath);
    } else {
      combinedFilesMap.set(text, [shortPath]);
    }
  });
  const combinedFiles = [];
  combinedFilesMap.forEach((paths, text) => combinedFiles.push({ text, paths }))
  console.log({ combinedFiles, commonRoot });
  return { combinedFiles, commonRoot }
};

const FilesView = ({ files }) => {
  if (!files) {
    return <div/>;
  }

  const { combinedFiles, commonRoot } = combineIndenticalFiles(files);

  return (
    <div>
      <p>
        {files.length} files in <code>{commonRoot}</code>
      </p>
      {combinedFiles.map(({ text, paths }) => (
        <FileView text={text} paths={paths} />
      ))}
    </div>
  )
}

export default FilesView;
