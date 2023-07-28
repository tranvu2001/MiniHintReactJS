import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { Routes, Route, Router, Navigate } from 'react-router-dom'

import { publicRoutes } from "./routes/routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { Fragment, useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductManage from "./components/ProductManage/ProductManage";
import BrandManage from "./components/BrandManage/BrandManage";
import UpdateListProduct from "./components/ListProductsManage/UpdateProduct";
import AddProduct from "./components/ListProductsManage/AddProduct";
import ListProductsManage from "./components/ListProductsManage/ListProductsManage";
import AddCategory from "./components/ListCategoriesManage/AddCategory";
import UpdateCategory from "./components/ListCategoriesManage/UpdateCategory";
import CategoryManage from "./components/CategoryManage/CategoryManage";
import ListCategoriesManage from "./components/ListCategoriesManage/ListCategoryiesManage";
import AddBrand from "./components/ListBrandsManage/AddBrand";
import UpdateBrand from "./components/ListBrandsManage/UpdateBrand";
import ListBrandsManage from "./components/ListBrandsManage/ListBrandsManage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { AuthProvider } from "./Context/AuthContext";
import ViewProduct from "./components/ListProductsManage/ViewProduct";
import { CartProvider } from 'react-use-cart'
import Order from "./pages/Order/Order";
import OrderManage from "./components/OrderManage/OrderManage";
import ListOrdersManage from "./components/ListOrdersManage/ListOrdersManage";
import ProductServices from "./axios/ProductServices";

function App() {



  const [isLogin, setIsLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  const [search, setSearch] = useState('')
  const [productsSearch, setProductsSearch] = useState([])
  let data

  const value = {
    isLogin,
    setIsLogin,
    currentUser,
    timeActive,
    setTimeActive,
    search,
    setSearch,
    productsSearch,
    setProductsSearch
  }



  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        // user log out, handle something here
        setIsLogin(false)
        console.log('User is not logged in')
        return;
      }


      const token = await user.getIdToken();
      setIsLogin(true)
      setCurrentUser(user)
      console.log(user.displayName)
      console.log('Logged in user: ', token)
      console.log('uid: ', user.uid)
      localStorage.setItem('USER_INFO', JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: user.uid === 'wxM0DsG8wJRfpmxCNRy3JQwaxiE3' ? 'admin' : 'user',
        emailVerified: user.emailVerified,
        uid: user.uid
      }))

    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  data = JSON.parse(localStorage.getItem('USER_INFO')) ?? {}

  return (
    <AuthProvider value={value}>
      <CartProvider >
        <div className="App">

          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact

                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}

            <Route path="/dashboard" element={data.role === 'admin' ? <DefaultLayout><Dashboard /></DefaultLayout> : <Navigate to={'/login'} replace={true} />}>
              {/* <Route index element={<DefaultLayout><ProductManage /></DefaultLayout>} /> */}


              <Route path="product-manage" exact element={<ProductManage />} >
                <Route index element={<ListProductsManage />} />
                <Route path="add" element={<AddProduct />} />
                <Route path="update/:id" element={<UpdateListProduct />} />
                <Route path="view-product/:id" element={<ViewProduct />} />
              </Route>

              <Route path="category-manage" exact element={<CategoryManage />} >
                <Route index element={<ListCategoriesManage />} />
                <Route path="add" element={<AddCategory />} />
                <Route path="update/:id" element={<UpdateCategory />} />
              </Route>

              <Route path="brand-manage" exact element={<BrandManage />} >
                <Route index element={<ListBrandsManage />} />
                <Route path="add" element={<AddBrand />} />
                <Route path="update/:id" element={<UpdateBrand />} />
              </Route>

              <Route path="order-manage" exact element={<OrderManage />}>
                <Route index element={<ListOrdersManage />} />
              </Route>
            </Route>



            <Route path="/order" element={data?.role === 'user' ? <DefaultLayout><Order /></DefaultLayout> : <Navigate to={'/login'} />} replace={true} />

          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
