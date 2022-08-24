/* Modules */
import React from "react";

/* Dépendances */
import Cards from '../../components/Post/Cards'
import CreateCard from '../../components/Post/CreateCard'

export default function Home() {
  return (
    <>
      <CreateCard />
      <Cards />
    </>
  )
};