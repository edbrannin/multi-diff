const FilesView = ({ files }) => {
  if (!files) {
    return <div/>;
  }

  return (
    <div>
      <p>
        {files && files.length} files
          </p>
      {files.map(({ text, path }) => (
        <p key={text}>{path} says: {text}</p>
      ))}
    </div>
  )
}

export default FilesView;
