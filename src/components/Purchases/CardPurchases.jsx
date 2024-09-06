import React from 'react'
import CardPurchaseMain from './CardPurchaseMain'

const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October","November", "December"]

const CardPurchases = ({purchase}) => {

    const dateData = new Date(purchase.createdAt)
    const day = dateData.getDate()
    const month = months[dateData.getMonth()]
    const year = dateData.getFullYear()
    const hour = dateData.getHours()
    const minute = dateData.getMinutes()
    const second = dateData.getSeconds()

    
    const formattedDate = `${day} de ${month} del ${year}`
    const formattedHour = `${hour}:${minute}:${second}`


  return (
    <article className='purchase-card'>
        <div className='purchase-card__header'>
            <p className='purchase-card__header_date'> {formattedDate} </p>
            <p className='purchase-card__header_hour'> {formattedHour} </p>
        </div>
        <div className='purchase-card__main'>
            {
                purchase.purchased.map(purchased => <CardPurchaseMain key={purchased.id} purchased={purchased} />)
            }
        </div>
    </article>
    
  )
}

export default CardPurchases