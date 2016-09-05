export default (filter) => (
  <p>
    Show:
    {" "}
    <Filter currentFilter={filter} filter="SHOW_ALL">
      All
    </Filter>
    {", "}
    <Filter currentFilter={filter} filter="SHOW_ACTIVE">
      Active
    </Filter>
    {", "}
    <Filter currentFilter={filter} filter="SHOW_COMPLETED">
      Completed
    </Filter>
  </p>
)
