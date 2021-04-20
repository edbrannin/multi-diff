import styled from 'styled-components';

const Padder = styled.div`
  padding-top: 1em;
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

const PathList = styled.ul`
  padding-inline-start: 1em;
`;

const Path = styled.li`
  font-family: 'FiraCode Nerd Font', monospace;
  list-style-type: none;

`;

const FileView = ({ text, paths, selectPath, deselectPath }) => {
  console.log('Paths is:', paths);
  return (
    <Padder>
      <Wrapper>
        <FileText>{text}</FileText>
        <PathList>
          {paths.map(path => (
            <Path key={path}>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      selectPath(path);
                    } else {
                      deselectPath(path);
                    }
                  }}
                />
                {path}
              </label>
            </Path>
          ))}
        </PathList>
      </Wrapper>
    </Padder>
  )
}

export default FileView;
