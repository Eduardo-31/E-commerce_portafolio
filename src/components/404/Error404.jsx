import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Error404.css'


const Error404 = () => {
  return (
	<section className='container-404'>

	<div className="error-frame">
	<div className="container">
		<h1>404</h1>
		<h4>Opps! Page not found</h4>
		<p>Soory, the page you're looling for doesn't exist. you can go to home page.</p>
		<div className="btn">
			<Link to={'/'}>Return home</Link>
		</div>
	</div>
</div>
	</section>

  )
}

export default Error404