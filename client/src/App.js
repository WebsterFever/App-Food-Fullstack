import "./App.css";
import { routes } from "./routes/routes";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      {/* <Route exact path={'/home'}>
          <Home />
        </Route>
        // <Route exact path={'/formulario'}>
        //   <Form />
        // </Route> */}

      {routes.map((rota) => (
        <Route exact key={rota.url} path={rota.url}>
          {rota.Elemento}
        </Route>
      ))}
    </Switch>
  );
}

export default App;
