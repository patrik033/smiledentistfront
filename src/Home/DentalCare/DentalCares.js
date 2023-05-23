import React, { useState, useEffect } from "react";
import DentalCare from "./DentalCare";
import Spinner from 'react-bootstrap/Spinner';
import { DentalData} from "../../StaticData/StaticData";


function DentalCares() {
    const [post, setPost] = useState(null);
    const [waiter, setWaiter] = useState(false);

    useEffect(() => {
        setPost(DentalData);
        setWaiter(true);
    }, []);

    if (waiter === false) {
        return (
            <div>
                <h1>Loading <Spinner animation="border" /></h1>
            </div>
        );
    }

    else {
        return (
            <div>

                <div className="d-flex justify-content-between flex-wrap">
                    {post.map((dentalCare) => (
                        <DentalCare
                            key={dentalCare.Id}
                            treatmentName={dentalCare.TreatmentName}
                            treatmentInformation={dentalCare.TreatmentInformation}
                            treatmentPrice={dentalCare.TreatmentPrice}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default DentalCares;