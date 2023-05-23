import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
import DateRender from "./DateRender.js";
function Bookings(){
    return(
        <div>
            <Navigation/>
            <DateRender/>
            <Footer/>
        </div>
    )
}
export default Bookings;