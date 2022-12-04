import Layout from "./components/Layout/Layout";
import { CartProvider, UserProvider } from './context';
function App() {
  return (
    <UserProvider>
      <CartProvider>
        {/* is user  */}
        <Layout />
        {/* is admin */}
        {/* <DashBoard /> */}
      </CartProvider>
    </UserProvider>
  );
}

export default App;
