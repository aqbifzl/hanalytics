import { useSession } from "next-auth/react"
import { MainDrawer } from "./MainPanel"
import { BlankPending } from "./FetchingDataUtils/BlankPending"
import { NotLogged } from "./NotLogged"

export const LoginGuard = () => {
  const {status} = useSession()

  switch(status){
    case "loading":
      return <BlankPending/>
    case "authenticated":
      return <MainDrawer/>
    case "unauthenticated":
      return <NotLogged/>
  }
}
