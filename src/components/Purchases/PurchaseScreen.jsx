import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setActiveRoute } from '../../store/slices/activeRoute'
import { getAllPurchases } from '../../store/slices/purchases.slice'
import getHeaderConfig from '../../utils/getHeaderConfig'
import CardPurchases from './CardPurchases'


import './styles/Purchases.css'

export const PurchaseScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const purchases = useSelector(state => state.purchases)
    const loading = useSelector(state => state.loading)

    useEffect(() => {
      dispatch(setActiveRoute('purchases'))
      dispatch(getAllPurchases()) 
    }, [])
    
    
  

  return (
    <main>
      <section className='section-purchases'>
          <h5 className='purchase-title'>My Purchases</h5>

            {

              !loading &&

              !purchases.length ?
              <div className='container-purchases-null'>
                <p className='purcharses-null__hello'>&#161;Hello, greetings <span className='purchases-null__name'>{localStorage.getItem('first_name')} {localStorage.getItem('last_name')}</span>, on behalf of the entire Tech Shop family&#33;</p>
                <p className='purchases-null__text'>We inform you that so far you have not made any purchase (Checkout).</p>
                <p className='purchases-null__text'>click <span onClick={() => navigate('/')} className='purchases-null__link'>here</span> to see products.</p>
              </div>
              : 
              <div className='container-purchases'>
              {
                purchases?.map(purchase => <CardPurchases key={purchase.id} purchase={purchase} />)
              }
              </div>
              
            }
      </section>
    </main>
  )
}

export default PurchaseScreen