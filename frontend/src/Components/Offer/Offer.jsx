import './Offer.css'
import exclusive_img from '../assets/sorting-box.png'

export const Offer = () => {
  return (
    <div className='offers'>
<div className="offers-left">
    <h1>Exclusive</h1>
    <h1>Offers to you</h1>
    <p>ONLY ON BEST SELLERS PRODUCT</p>
    <button>Check Now</button>
</div>
<div className="offers-right">
    <img src={exclusive_img} alt=''/>
</div>

    </div>
  )
}
