
import './App.css';
import React, {useState} from 'react'
import axios from 'axios'


function App() {
  const [data, setData] = useState([])
  const [email, setEmail] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()
    alert("Starting Exole Request")
    const tokenRes =  await axios.post("http://localhost:9000/apiTest/createToken", {email: email})
    alert(`Got Access Token: ${tokenRes.data.access_token}`)
    const profileRes = await axios.post("http://localhost:9000/apiTest/updateProfile", {email: email, access_token: tokenRes.data.access_token})
    alert(`Update Profile: ${profileRes.data.status}`)
    const shareLinkRes = await axios.post("http://localhost:9000/apiTest/createShare", {email: email, access_token: tokenRes.data.access_token})
    setData(shareLinkRes.data)
  }
  return (
    <div className="App">
      <header className="App-header">Extole API Example
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'> Email </label>
        <input id='email'  onChange={(e) => setEmail(e.target.value)}></input>
        <button type="submit"> Execute</button>
      </form>
      {data.link && (
        <p>
        Share Link: <a href={data.link}>{data.link}</a>
        </p>
      )}
      </header>
    </div>
  );
}

export default App;
