import { BrowserRouter, Switch, Route } from "react-router-dom";
import Contact from "../pages/contact/contact";
import Home from "../pages/home/home";
import Introduct from "../pages/introduct/introduct";
import Login from "../pages/login/login";
import NotFoundPage from "../pages/notFound/notFound";
import Register from "../pages/register/register";


function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/doan/" component={Home} exact/>
                <Route path="/doan/introduct" component={Introduct} />
                <Route path="/doan/contact" component={Contact} />
                <Route path="/doan/login" component={Login} />
                <Route path="/doan/register" component={Register} />
                <Route component={Home} />
            </Switch>
        </BrowserRouter>
    )
}
export default Router;