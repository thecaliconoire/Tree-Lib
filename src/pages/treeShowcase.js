import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import fetch from 'isomorphic-fetch'
import { CircularProgress, Collapse } from '@material-ui/core'
import { isArray } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 64
  },
  treeCard: {
    maxWidth: 600
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  fullScreenLoader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw'
  }
}))

const TreeShowcase = () => {
  const classes = useStyles()
  const [data, setData] = useState({ trees: [] })
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://s3.eu-central-1.amazonaws.com/ecosia-frontend-developer/trees.json')
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error)
        console.error(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleChange = (name) => {
    const trees = data.trees.map(tree => {
      if (tree.name === name) {
        return { ...tree, hidden: !tree.hidden }
      }
      return tree
    })
    setData({ trees })
  }

  if (loading) {
    return (
      <div className={classes.fullScreenLoader}>
        <CircularProgress variant='indeterminate' />
      </div>
    )
  }

  if (error) {
    return (
      <div className={classes.root}>
        <Typography variant='h2'>Claytons Trees!</Typography>
        <Typography variant='subtitle1'>An error occured:</Typography>
        <Typography variant='body1'>{`${error}`}</Typography>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Typography variant='h2' gutterBottom>Claytons Trees!</Typography>
      <Grid container spacing={4}>
        {isArray(data?.trees) && data.trees.map(tree => (
          <Grid key={tree.name} item xs={12} sm={6} md={4}>
            <Card className={classes.treeCard}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {tree.name}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {tree.species_name}
                  </Typography>
                </CardContent>
                <Collapse in={!tree.hidden}>
                  <CardMedia
                    component='img'
                    alt={tree.name}
                    height='600'
                    image={tree.image}
                    title={tree.name}
                  />
                </Collapse>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => handleChange(tree.name)}>
                  Hide Image
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default TreeShowcase
