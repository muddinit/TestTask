import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const getList = () => {
  const request = axios.get(`${baseUrl}user_action_history_list`)
  return request.then(response => response.data)
}

export default { getList }