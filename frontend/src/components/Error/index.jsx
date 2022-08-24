/* Modules */
import React from 'react'
import styled from 'styled-components'

/* Dépendances */
import colors from '../../utils/style/colors'
import ErrorIllustration from '../../assets/404.svg'

/* Style */
const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.secondary};
  margin: 30px;
`

const ErrorTitle = styled.h1`
  color: ${colors.tertiary};
  font-weight: 300;
`

const ErrorSubtitle = styled.h2`
  color: ${colors.tertiary};
  font-weight: 300;
`

const Illustration = styled.img`
  max-width: 800px;
`

export default function Error() {
  return (
    <ErrorWrapper>
      <ErrorTitle>Oups...</ErrorTitle>
      <br />
      <Illustration src= {ErrorIllustration} />
      <br />
      <ErrorSubtitle>
        Il semblerait que la page que vous cherchez n’existe pas !
      </ErrorSubtitle>
    </ErrorWrapper>
  )
};