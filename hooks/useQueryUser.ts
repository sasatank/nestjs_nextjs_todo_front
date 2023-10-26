import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { User } from '@prisma/client'

const useQueryUser = () => {
  const router = useRouter()
  const getUser = async () => {
    const { data } = await axios.get<Omit<User,'hashedPassword'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`
    )
    return data
  }
  return useQuery<Omit<User,'hashedPassword'>,Error> ({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (err: any) =>{
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/')
    },
  }
    
  )
}

export default useQueryUser;