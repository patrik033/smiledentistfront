import React, { useState, useEffect } from "react";
import { DentalData } from "../StaticData/StaticData";
import SingleTreatment from "./SingleTreatment";
import { Spinner } from "react-bootstrap";

function TreatmentList() {
    const [post, setPost] = useState(null);
    const [waiter, setWaiter] = useState(false);


    useEffect(() => {
        setPost(DentalData);
        setWaiter(true);
    }, []);

    return (
        <div>
            {!waiter &&
                <div>
                    <h1>Laddar...<Spinner animation="border" /></h1>
                </div>
            }
            {waiter &&
                <div className="d-flex justify-content-between flex-wrap">

                    {post.map((treatment) => {
                        return (
                            <SingleTreatment
                                id={treatment.Id}
                                key={treatment.Id}
                                treatmentinformation={treatment.TreatmentInformation}
                                treatmentname={treatment.TreatmentName}
                                treatmentprice={treatment.TreatmentPrice}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default TreatmentList;