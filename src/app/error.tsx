"use client"
 
import { Card, CardContent, Drawer, Grid, Typography } from "@mui/material"
import "../styles/globals.css"
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <Grid xs={12}>
      <div className="flex w-full h-screen justify-center items-center">
        <Drawer variant="permanent" className="w-screen">
          <div className="flex w-screen h-screen justify-center items-center">
            <Card className="mx-5">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Error occurred
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {error.message}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We&#39;re so sorry about this
                  </Typography>
                </CardContent>
            </Card>
          </div>
        </Drawer>
      </div>
    </Grid>
  )
}
