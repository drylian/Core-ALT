import React from 'react'
import http from '../axios/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const NewPost = () => {
  /**
   * navigate, é responsavel por selecionar onde tu vai ser
   * enviado depois de terminar o "post".
   */
  const navigate = useNavigate()

    /**
   * Const de configuração, "title" é a const com o valor recebido, 
   * e "setTitle" é responsavel para setar o valor do "posts".
   * o body é a mesma coisa.
   */
  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  /**
   * Sistema de post basico, esse vai fazer o req para o backend 
   * configurado . faz um "post"  
   */
  const createPost = async (e) => {
    /**
     * e.preventDefault(); é usado para garantir que a pagina
     * não será atualizada, quando o botão "Criar Post" for
     * clicado.
     */
    e.preventDefault();
    const userID = 1
    const post = (title, body, userID)
    console.log(post)
    await http.post("/posts", { body: post })
    navigate("/")
  }
  /**
   * Serve para fazer a solicitação, use dessa forma, sem return, 
   * no "return" voce vai fazer centenas de solicitações, e por 
   * isso acumulará muita coisa e uso de internet. 
   */
  return (
    <>
      <h2>Metodo de Post</h2>
      {/**
       * (e) é unma função criada para armazenar os dados do 
       * post antes de envia-los de uma vez, para permitir fazer
       * oque vai acontencer após o botão "Criar Post" for clicado.
       */}
      <form onSubmit={(e) => createPost(e)}>
        <label htmlFor="title">Tituto:</label>
        <input type="text" name='title' placeholder='Digite o titulo.' onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="body">Conteudo:</label>
        {/**
         * onChange={(e) => setBody(e.target.value)}, {() =>} é 
         * usado para chamar uma função sem nome, "e.target.value"
         * é o valor que o usuario digitou e que vai ser armazenado 
         * no "setBody" por ex.
         */}
        <input type="text" name='body' placeholder='Digite o conteudo.' onChange={(e) => setBody(e.target.value)} />
        <input type="submit" value="Criar Post" />
      </form>
    </>
  )
}

export default NewPost