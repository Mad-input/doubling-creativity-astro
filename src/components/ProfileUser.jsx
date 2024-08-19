import { useEffect, useState } from "react"
import { getProfile } from "../api/auth.js"

export default function ProfileUser() {
  const [data, setData] = useState({})

  const getData = async () => {
    try {
      const response = await getProfile()
      return setData(response.data.user)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <h1>{data.name}</h1>
      <h2>{data.email}</h2>
    </>
  )
}
