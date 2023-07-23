import React from 'react'
import Loading from '../components/elements/loader/Loading'
import ContentBlock from '../components/elements/models/ContentBlock'

const Loadings = () => {
  return (
    <>
      <Loading/>
      <ContentBlock title={'Loading'} showFlashKey={'Loading'}>
        
      </ContentBlock>
    </>
  )
}

export default Loadings