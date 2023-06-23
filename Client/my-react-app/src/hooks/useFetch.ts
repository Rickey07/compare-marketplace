import axios from 'axios';
import {useState,useEffect} from 'react'

export default function useFetch(url:string) {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [data,setData] = useState([])

    useEffect(() => {
        getData()
    },[url])

    async function getData () {
        try {
            setLoading(true)
            const {data} = await axios.get(url)
            setData(data)
        } catch (error:any) {
            setError(error)
        }
    }

    return [loading,error,data]
}