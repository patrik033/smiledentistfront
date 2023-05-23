import { Alert } from 'react-bootstrap';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';

function EmailSent() {
    return (
        <div>
            <Navigation />
            <Alert className="mt-5" key="info" variant="info">
                Ett mail har skickats till dig, vänligen bekräfta detta för att kunna logga in.
                <Alert.Link className="ms-3" href="/login">Gå till sidan för att logga in</Alert.Link>
            </Alert>
            <div><Footer/></div>
        </div>
    )
}

export default EmailSent;