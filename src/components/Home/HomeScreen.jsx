import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveRoute } from '../../store/slices/activeRoute'
import { getAllCart } from '../../store/slices/cart'
import { getAll } from '../../store/slices/product.slice'
import CardAddProductToCart from '../Shared/CardAddProductToCart'
import FooterScreen from '../Shared/FooterScreen'
import HeaderScreen from '../Shared/HeaderScreen'
import Loading from '../Shared/Loading'
import Banner from './Banner'
import CardProduct from './CardProduct'
import './styles/Home.css'
import './styles/Product.css'
import Kitchen from '../../image/kitchen.png'
import KitchenWhite from '../../image/kitchen-white.png'
import axios from 'axios'
import { setLoading } from '../../store/slices/loading'
import { getAllCategories } from '../../store/slices/categories.slice'

const icons = {
  "Kitchen": <img src={KitchenWhite} alt="Kitchen" />,
  "Smart TV": <i className="fa-solid fa-tv"></i>, 
  "Smartphones":  <i className="fa-solid fa-mobile-screen"></i>,
  "Computers": <i className="fa-solid fa-computer"></i>
}

const HomeScreen = () => {

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [search, setSearch] = useState([])

  const [productInCart, setProductInCart] = useState(null)


  const dispatch = useDispatch()

  const products = useSelector(state => state.product)
  const categories = useSelector(state => state.categories)
  const loading = useSelector(state => state.loading)
  const cart = useSelector(state => state.cart)


  useEffect(() => {
    localStorage.getItem('token') && !cart.length && dispatch(getAllCart())
    dispatch(setActiveRoute('home'))
    !products.length && dispatch(getAll())
    !categories.length && dispatch(getAllCategories())
  }, [])
  
  const getFilteredProducts = (query) => {
    dispatch(setLoading(true))
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?${query}`)
      .then(res => setSearch(res.data))
      .catch(err => console.log(err))
      .finally(() => dispatch(setLoading(false)))
  }

  const getCategories = (value) => {
    const query = `categoryId=${value}`
    getFilteredProducts(query)
    setSelectedCategory(value)
  }

  const allProduct = () => {
    setSelectedCategory(null)
    setSearch([])
  }


  const searchProduct = (e) => {
    e.preventDefault()
    const value = e.target.children[0].value
    if(value.length){
      let query = ''
      query+= `title=${value}`
      if(selectedCategory){
        query += `&categoryId=${selectedCategory}`
      }
      getFilteredProducts(query)
      e.target.reset()
    }
  }


  return (
    <>
        { productInCart && <CardAddProductToCart setProductInCart={setProductInCart} productInCart={productInCart} />}
        { loading && <Loading />}
        <HeaderScreen />
        <main>
          <div>
            <section className='section-category-form'>
              <div className='container-category'>
                <div className='category-header'>
                  <h3 className='category-title'>Select Category</h3>
                  <p onClick={allProduct} className={selectedCategory === null ? 'category-subtitle active-category' : 'category-subtitle'}>view all</p>
                </div>
                <div className='category'>
                  {
                    categories?.map(cat => (
                      <article key={cat.id} className='category__card'>
                        <div onClick={() => getCategories(cat.id)} className={selectedCategory === cat.id ? 'category__circle bg-active-category' : 'category__circle'}>
                          {
                            icons[cat.name]
                          }
                        </div>
                        <span translate='no' className={selectedCategory === cat.id ? 'category__title active-category': 'category__title'}>{cat.name}</span>
                      </article>
                    ))
                  }
                </div>
              </div>
              <div className='container-form'>
                  <h3 className='form-title'>Search</h3>
                  <form onSubmit={searchProduct}>
                    <input className='form__input' type="text" />
                    <button className='form__btn'><i className="form__btn_i fa-solid fa-magnifying-glass"></i></button>
                  </form>
              </div>
            </section>
          </div>
          <Banner />
            {
              search.length || !selectedCategory || (loading && !search.length) ?
              <section className='section-products'>
                {
                  search.length ? 
                  search.map(product => <CardProduct key={product.id} product={product} setProductInCart={setProductInCart} />)
                  :
                  products?.map(product => <CardProduct key={product.id} product={product} setProductInCart={setProductInCart} />)
                }
                <article></article>
                <article></article>
              </section>
              :
              <div className='product-null'>
                <p>Sorry, no products were found, click <span onClick={allProduct} className='product-null-span'>here</span> to see products</p>
              </div>
            }
        </main>
        <FooterScreen />

    </>
  )
}

export default HomeScreen