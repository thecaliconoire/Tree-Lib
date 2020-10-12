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

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  tree_card: {
    maxWidth: 600,
    margins: 100
  }
})

const TreeShowcase = () => {
  const classes = useStyles()
  const [data, setData] = useState({ trees: [] })
  const [showResults, setShowResults] = React.useState(false)

  const handleChange = (data) => {
    setShowResults(prev => !prev)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://s3.eu-central-1.amazonaws.com/ecosia-frontend-developer/trees.json')
      const data = await response.json()
      console.log(data)
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {data.trees.map(tree => (
            <Grid key={tree.name} item xs={3} spacing={2}>
              {showResults
                ? <Card className={classes.tree_card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {tree.name}
                      </Typography>
                      <Typography variant='body2' color='textSecondary' component='p'>
                        {tree.species_name}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component='img'
                      alt={tree.name}
                      height='600'
                      image={tree.image}
                      title={tree.name}
                    />
                  </CardActionArea>
                  <CardActions>
                    <Button size='small' color='primary' onClick={handleChange}>
                    Hide Image
                    </Button>
                  </CardActions>
                </Card>
              // When image is hidden
                : <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {tree.name}
                      </Typography>
                      <Typography variant='body2' color='textSecondary' component='p'>
                        {tree.species_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button justify='center' size='small' color='primary' onClick={handleChange}>
                    Show Image
                    </Button>
                  </CardActions>
                </Card>}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TreeShowcase
