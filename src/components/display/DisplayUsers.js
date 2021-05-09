import React from 'react'

import fetchRequest from '../request/fetchRequest'

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'

const {useState, useEffect} = React

function DisplayUsers() {
  const [users, setUsers] = useState([])
  const headers = [
    'First Name', 'Last Name', 'Address 1', 'Address 2',
    'City', 'State', 'Zip', 'Country', 'Date Added'
  ]
  const [loadedState, setLoadedState] = useState(false)
  // const [errorState, setErrorState] = useState(false) // Use for error handling on bad server request
  const [tableEmpty, setTableEmpty] = useState(false)

  useEffect(() => {
    console.log('rendered')
    async function fetchUsers() {
      console.log('calling')
      const route = 'https://0sjhqfet72.execute-api.us-east-1.amazonaws.com/dev/api/admin'

      const data = await fetchRequest({url: route, type: 'GET'})

      if (data.error) {
        console.log(data.error)
        // setErrorState(true)
      } else {
        console.log(data)
        setUsers(data.res.users)
        if (data.res.users.length < 1) {
          setTableEmpty(true)
        }
        setLoadedState(true)
      }
    }

    fetchUsers()
  }, [])

  function convertTimestamp(stamp) {
    let date = new Date(Number(stamp) * 1000)
    date = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear()
    return date
  }

  return (
    <>
      <Container fluid>
        <Jumbotron id='jumbo'><h1>Admin View</h1></Jumbotron>
        
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                {headers.map(header =>
                  <th key={header}>{header}</th>  
                )}
              </tr>
            </thead>
            {loadedState
            ?
              <tbody>
                {users.map(user => 
                  <tr key={user.uuid["S"]}>
                    <td className='usersCell'>{user.first_name["S"]}</td>
                    <td className='usersCell'>{user.last_name["S"]}</td>
                    <td className='usersCell'>{user.address_one["S"]}</td>
                    <td className='usersCell'>{user.address_two["S"]}</td>
                    <td className='usersCell'>{user.city["S"]}</td>
                    <td className='usersCell'>{user.state["S"]}</td>
                    <td className='usersCell'>{user.zipcode["S"]}</td>
                    <td className='usersCell'>{user.country["S"]}</td>
                    <td className='usersCell'>{convertTimestamp(user.created_date["N"])}</td>
                  </tr>  
                )}
              </tbody>
            :
              tableEmpty
              ?
                <div>
                  <p>
                    There are no registered users yet.
                  </p>
                </div>
              :
              <>
                <Spinner/>
              </>
            }
          </Table>
      </Container>
    </>
  )
}

export default DisplayUsers;