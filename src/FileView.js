import styled from 'styled-components';

const Padder = styled.div`
  padding-bottom: 1em;
`

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const FileText = styled.code`
  font-family: 'FiraCode Nerd Font', monospace;
  white-space: pre-wrap;
  background-color: wheat;
  padding: 1em;
  border-radius: 1em;
`;

const Path = styled.li`
  font-family: 'FiraCode Nerd Font', monospace;
`;

const FileView = ({ text, paths }) => {
  console.log('Paths is:', paths);
  return (
    <Padder>
      <Wrapper>
        <FileText>{text}</FileText>
        <ul>
          {paths.map(path => (
            <Path key={path}>
              <input type="checkbox" />
              {path}
            </Path>
          ))}
        </ul>
      </Wrapper>
    </Padder>
  )
}

export default FileView;
