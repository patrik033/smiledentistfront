import Button from 'react-bootstrap/Button';

function AboutUs(){
    return(
        <section style={{backgroundColor:"#fff",height:"300px",marginTop:"30px"}}>
            <div>
                <h1>Vill du veta mer om oss?</h1>
                <p style={{maxWidth:"50%"}}>Tandvård startades med målsättning att skapa en modern tandläkarmottagning som erbjuder högklassig tandvård till förmånliga priser.</p>
                <Button variant="primary">Primary</Button>{' '}
            </div>
        </section>
    );
}

export default AboutUs;