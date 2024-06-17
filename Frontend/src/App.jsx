import { useState, useEffect } from 'react'
import userHistoryService from './services/user_history'
import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'id',
		selector: row => row.id,
	},
	{
		name: 'user_id',
		selector: row => row.user_id,
	},
  {
		name: 'action_type',
		selector: row => row.action_type,
	},
  {
		name: 'action_date',
		selector: row => row.action_date,
	},
];

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [value, setValue] = useState('')
  const [data, setData] = useState([]);
	
  useEffect(() =>{
    userHistoryService
        .getList()
        .then((response) => {
        setTableData(response);
        setData(response);
      })
    }, [])

    const filterData = (e) => { 
      const inputValue = e.target.value;
      setValue(inputValue)
      const data = tableData.filter((user) => {
        if(user.user_id !== null){
        return user.user_id.startsWith(inputValue) }
    });
      setData(data);
    }
	
  return (
    <div>
    <input
    type="search"
    className="form-control-sm border ps-3"
    placeholder="Поиск"
    value={value}
    onChange={filterData}
    />
    <DataTable
			columns={columns}
			data={data}
      pagination
		/>
    </div>
  )
}

export default App
