import React from 'react'
import { useState, useEffect } from 'react'
import http from '../api/http'
import Loading from '../components/elements/loader/Loading'
import Header from '../components/elements/Header'
import ContentBlock from '../components/elements/models/ContentBlock'

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
      <ContentBlock title={'Pagina inicial'} showFlashKey={'mainmenu'}>
        <Header />
        {!posts || posts.length === 0 ? (
          <Loading />
        ) : (
          posts.message ? (
            <h2 className="text-center text-gray-500 text-20 p-5">{posts.message}</h2>
          ) : (
            posts.map((post) => (
              <div className="bg-gray-200 p-4 mb-4" key={post.id}>
                <h2 className="text-lg font-semibold">{post.title}</h2>
              </div>
            ))
          )
        )}

      </ContentBlock>
    </>
  )
}

export default Home