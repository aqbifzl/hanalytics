import { Button, Card, CardActions, CardContent, Drawer, Grid, Typography } from "@mui/material"
import { signIn } from "next-auth/react"

export const NotLogged = () => {
  return (
    <Grid xs={12}>
      <div className="flex w-full h-screen justify-center items-center">
        <Drawer variant="permanent" className="w-screen">
          <div className="flex w-screen h-screen justify-center items-center">
            <Card className="mx-5">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Welcome!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Welcome to analytics panel, you&#39;re currently unauthenticated. Please login using button below to access panel.
                  </Typography>
                </CardContent>
              <CardActions className="flex items-center w-full justify-center">
                <Button size="small" color="primary" onClick={() => signIn()}>
                  Login
                </Button>
              </CardActions>
            </Card>
          </div>
        </Drawer>
      </div>
    </Grid>
  )
}
