import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'

const HideButton = () => {
  const [showResults, setShowResults] = React.useState(false)

  const onClick = () => setShowResults(true)

  return (
    <Button size='small' color='primary' onClick={onClick}>
Hide
    </Button>
  )
}
export default HideButton
