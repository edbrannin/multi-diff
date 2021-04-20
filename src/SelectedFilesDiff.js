import ReactDiffViewer from 'react-diff-viewer';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1em;
  background-color: wheat;
  border-radius: 1em;
`;

const SelectedFilesDiff = ({ files, selectedFiles }) => {
  if (!selectedFiles || selectedFiles.length === 0) {
    return null;
  }

  if (selectedFiles.length !== 2) {
    return (
      <Wrapper>
        <p>{selectedFiles.length} files selected:</p>
        <ul>
          {selectedFiles.map(selection => (
            <li key={selection}>{selection}</li>
          ))}
        </ul>
      </Wrapper>
    )
  }

  const [file1, file2] = files.filter(({ path }) => selectedFiles.includes(path));
  if (file1 === undefined || file2 === undefined) {
    return <pre>
      File1: {JSON.stringify(file1, null, 2)}
      File2: {JSON.stringify(file2, null, 2)}
      files: {JSON.stringify(files, null, 2)}
    </pre>
  }

  return (
    <Wrapper>
      <ReactDiffViewer
        oldValue={file1.text}
        leftTitle={file1.path}

        newValue={file2.text}
        rightTitle={file2.path}

        splitView={true}
      />
    </Wrapper>
  )
}

export default SelectedFilesDiff;
