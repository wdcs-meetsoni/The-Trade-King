import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import slider1 from '../../../public/images/slider1.jpg'
import slider2 from '../../../public/images/slider2.jpg'
import slider3 from '../../../public/images/slider3.jpg'
import slider4 from '../../../public/images/slider4.jpg'
const HomePage = () => {
  return(<>
    
    <Carousel slide={false}>
      <Carousel.Item>
        <Image
          className="slider"
          src={slider1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
         className="slider"
          src={slider2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
       className="slider"
          src={slider3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
           className="slider"
          src={slider4}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Fourth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>)
}

export default HomePage
