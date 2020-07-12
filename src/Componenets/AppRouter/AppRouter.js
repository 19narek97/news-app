import React from "react";
import {Route} from "react-router-dom"

export default function AppRouter({layout, component, ...res}) {

    const [Layout, Component] = [layout, component];

    return (
        <Route {...res}
               render={
                   props => (
                       <Layout>
                           <Component {...props} />
                       </Layout>
                   )
               }
        />
    )

}