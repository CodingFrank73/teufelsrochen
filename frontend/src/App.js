import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { productInputs, userInputs } from './formSource';
import { customers, products, users } from './dataTableColumnSource';

function App() {

  const [token, setToken] = useState(null);
  const logout = () => setToken(null)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login setToken={setToken} />} />
            <Route path="login" element={<Login setToken={setToken} />} />

            <Route path="dashboard">
              <Route index element={<Home />} />
            </Route>

            <Route path="users">
              <Route index element={<List route="/api/users/all" columns={users} />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New inputs={userInputs} title="Neuen Benutzer anlegen" />} />
            </Route>

            <Route path="products">
              <Route index element={<List route="/api/products/all" columns={products} />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New inputs={productInputs} title="Neues Produkt anlegen" />} />
            </Route>

            <Route path="customers">
              <Route index element={<List route="/api/customers/all" columns={customers} />} />
              <Route path=":customerId" element={<Single />} />
              <Route path="new" element={<New inputs={userInputs} title="Neuen Kunden anlegen" />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;


