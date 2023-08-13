import React from 'react'
import { useState, useEffect } from 'react'
import http from '../api/http'
import Header from '../components/elements/Header'
import Sidebar from '../components/elements/Sidebar'

const Home = () => {
  /**
   * Const de configuração, "posts" é a const com o valor recebido, 
   * e "SetPost" é responsavel para setar o valor do "posts".
   */
  const [posts, SetPost] = useState([])

  /**
   * Sistema de obter os post. 
   */
  const getPost = async () => {
    try {
      const response = await http.get("/posts")
      const data = response.data
      console.log(data)
      SetPost(data)
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Serve para fazer a solicitação, use dessa forma, sem return, 
   * no "return" voce vai fazer centenas de solicitações, e por 
   * isso acumulará muita coisa e uso de internet. 
   */
  useEffect(() => {
    getPost()
  }, [])

  /**
   * Retorno do React, Aqui fica as configurações do react, 
   * essa aplicação possue tailwind.
   */
  return (
    <>
    <Header />
    <Sidebar />      
    </>
  )
}

export default Home