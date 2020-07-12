import React from "react";
import {Switch} from 'react-router'
import AppRouter from "./Componenets/AppRouter/AppRouter";
import UserLayout from "./Componenets/layouts/UserLayout";
import Home from "./view/Home";
import SourcesAndCategory from "./view/SourcesAndCategory";
import PageNotFound from "./view/PageNotFound";

class Routers extends React.Component {


    render() {
        return (
            <Switch>
                <AppRouter exact path={"/"} layout={UserLayout} component={Home}/>
                <AppRouter exact path={"/:page/:id"} layout={UserLayout} component={SourcesAndCategory}/>
                <AppRouter exact path={"*"} layout={UserLayout} component={PageNotFound}/>
            </Switch>
        )
    }
}

export default Routers