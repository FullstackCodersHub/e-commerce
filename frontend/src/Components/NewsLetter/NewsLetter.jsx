import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'><h1>Get Exclusive offer in your emial</h1>
    <p>Subscribe to our newLetter</p>
    <div>
        <input type='email' placeholder='Your Email id'/>
        <button>Subscribe</button>
    </div>
    
    </div>
  )
}
