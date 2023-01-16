import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server"

const dataProvider = jsonServerProvider("http://localhost:3000/api");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
    <Resource name="topics" list={ListGuesser} />
  </Admin>
);

export default App;
