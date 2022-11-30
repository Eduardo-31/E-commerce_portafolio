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

const HomeScreen = () => {

  const [category, setCategory] = useState('')
  const [search, setSearch] = useState()
  const [searchNull, setSearchNull] = useState(false)
  const [bgCategory, setBgCategory] = useState('')
  const [getProductId, setGetProductId] = useState('')

  const [cartProductPlusQuantity, setCartProductPlusQuantity] = useState(false)
  const [filterProductQuantity, setFilterProductQuantity] = useState()

  const dispatch = useDispatch()

  const products = useSelector(state => state.product)
  const loading = useSelector(state => state.loading)

  const activeCardAddProduct = useSelector(state => state.activeCardAddProduct)


  useEffect(() => {

    dispatch(getAllCart())
    dispatch(setActiveRoute('home'))
    setBgCategory('all')
    !products.length && dispatch(getAll())

  }, [])
  
  const categories = (nameCategory) => {
    searchNull && setSearchNull(false)
    setCategory(products.filter(product => product.category.name === nameCategory))
    setBgCategory(nameCategory)
  }

  const allProduct = () => {
    setBgCategory('all')
    setCategory(null)
    setSearch(null)
    searchNull && setSearchNull(false)
  }


  const searchProduct = (e) => {
    e.preventDefault()
    searchNull && setSearchNull(false)
    if(e.target.children[0].value.length){
      e.preventDefault()
      setBgCategory(null)
      setCategory(null)
      const title = e.target.children[0].value.toLowerCase()
      const filtered = products.filter(product => product.title.toLowerCase().includes(title))
      setSearch(filtered)
        if(!filtered.length){
          setSearchNull(true)
        }
      e.target.reset()
    }
  }
  

  return (
    <>

        { activeCardAddProduct && <CardAddProductToCart getProductId={getProductId} cartProductPlusQuantity={cartProductPlusQuantity} setCartProductPlusQuantity={setCartProductPlusQuantity} quantityInCart={filterProductQuantity}  />}
        { loading && <Loading />}
        <HeaderScreen />
        <main>
          <div>
            <section className='section-category-form'>
              <div className='container-category'>
                <div className='category-header'>
                  <h3 className='category-title'>Select Category</h3>
                  <p onClick={allProduct} className={bgCategory === 'all' ? 'category-subtitle active-category' : 'category-subtitle'}>view all</p>
                </div>
                <div className='category'>
                  <article className='category__card'>
                    <div onClick={() => categories('Smartphones')} className={bgCategory === 'Smartphones' ? 'category__circle bg-active-category' : 'category__circle'}>
                      <i className="fa-solid fa-mobile-screen"></i>
                    </div>
                    <span className={bgCategory === 'Smartphones' ? 'category__title active-category': 'category__title'}>Smartphones</span>
                  </article>
                  <article className='category__card'>
                    <div onClick={() => categories('Smart TV')} className={bgCategory === 'Smart TV' ? 'category__circle bg-active-category': 'category__circle'}>
                      <i className="fa-solid fa-tv"></i>
                    </div>
                    <span className={bgCategory === 'Smart TV' ? 'category__title active-category': 'category__title'}>Smart TV</span>
                  </article>
                  <article className='category__card'>
                    <div onClick={() => categories('Computers')} className={bgCategory === 'Computers' ? 'category__circle bg-active-category' : 'category__circle'}>
                      <i className="fa-solid fa-computer"></i>
                    </div>
                  <span className={bgCategory === 'Computers' ? 'category__title active-category': 'category__title'}>Computers</span>
                  </article>
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
            { !searchNull  ?
              <section className='section-products'>
                {
              category ?
              category.map(product => <CardProduct key={product.id} product={product} setGetProductId={setGetProductId} setFilterProductQuantity={setFilterProductQuantity} setCartProductPlusQuantity={setCartProductPlusQuantity} />)
              : search ? 
              search.map(product => <CardProduct key={product.id} product={product}  setGetProductId={setGetProductId} setFilterProductQuantity={setFilterProductQuantity} setCartProductPlusQuantity={setCartProductPlusQuantity} />)
              :
              products.map(product => <CardProduct key={product.id} product={product} setGetProductId={setGetProductId} setFilterProductQuantity={setFilterProductQuantity} setCartProductPlusQuantity={setCartProductPlusQuantity} />)
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