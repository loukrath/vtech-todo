const TodoListTable = () => {
  return (
    <div className="bg-white mt-5 rounded-lg">
      <div className="overflow-x-auto">
        <table className="table text-black">
          {/* head */}
          <thead>
            <tr className="border-b-0 bg-gray-200 text-black">
              <th className="text-center w-24">COMPLETED</th>
              <th>TODO</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-gray-200">
              <th className="text-center">
                <label>
                  <input type="checkbox" className="checkbox checkbox-error" />
                </label>
              </th>
              <td>Cy Ganderton</td>
              <td>ACTION</td>
            </tr>
            <tr>
              <th className="text-center">
                <label>
                  <input type="checkbox" className="checkbox checkbox-error" />
                </label>
              </th>
              <td>Cy Ganderton</td>
              <td>ACTION</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TodoListTable
