import Details from "../views/Details/view";
import Entry from "../views/Entry/view";
import Form from "../views/Form/view";
import Home from "../views/Home/view";

const urlRouter = {
  ENTRY: "/",
  HOME: "/home",
  FORM: "/form",
  DETAILS: "/details/:id",
};

const routes = [
  {
    url: urlRouter.ENTRY,
    Elemento: <Entry />,
  },

  {
    url: urlRouter.HOME,
    Elemento: <Home />,
  },
  {
    url: urlRouter.DETAILS,
    Elemento: <Details />,
  },
  {
    url: urlRouter.FORM,
    Elemento: <Form />,
  },
];

export { routes };
