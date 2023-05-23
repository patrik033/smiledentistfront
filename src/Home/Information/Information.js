/* eslint-disable no-unused-vars */
import Row from 'react-bootstrap/Row';
import Navigation from '../../Shared/Navigation/Navigation';
import logo from "./../../img/home.jpg"
function Information() {


    const mainFeaturedPost = {
        title: 'Title of a longer featured blog post',
        description:
          "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: {logo},
        imageText: 'main image description',
        linkText: 'Continue reading…',
      };

    return (
        <div>
            <Row>
                <Navigation/>
            </Row>
            <Row>
                <img className='img-fluid' src={logo} alt="logo" style={{ maxHeight: "500px", marginBottom: "20px" }} />
            </Row> 
             <Row>
                <h1 style={{maxWidth:"50%",marginLeft:"5%",marginBottom:"2%"}} className="text-center">DIN PRIVATA TANDLÄKARE</h1>
                <p style={{maxWidth:"50%",marginLeft:"5%",marginBottom:"2%"}} className="text-center">Vi på Tandvård erbjuder dig alla typer av tandvård. Från akutbehandlingar till förebyggande vård, allmäntandvård, olika kosmetiska behandlingar och behandling med osynlig tandställning. Vi hälsar er varmt välkomna till oss på
                    Tandvård!</p>
            </Row>
        </div>
    );
}

export default Information;