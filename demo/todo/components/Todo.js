export default (text, onClick, completed) => {
  return (
    <li
      onClick={onClick}
      style={{textDecoration: completed ? 'line-through' : 'none'}}>
      {text}
    </li>
  )
}
