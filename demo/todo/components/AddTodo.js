export default () => {
  let input, id = 0
  return (
    <div>
      <form onSubmit={() => {onSubmit(input.value, id++)}}>
        <input ref={node => {input = node}}/>
        <button type='submit'>Add Todo</button>
      </form>
    </div>
  )
}
