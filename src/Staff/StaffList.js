import { useEffect, useState } from "react";
import SingleStaff from "./SingleStaff";
import { Spinner } from "react-bootstrap";
import { EmployeeData } from "../StaticData/StaticData";

function StaffList() {
    const [post, setPost] = useState(null);
    const [waiter, setWaiter] = useState(false);


    useEffect(() => {
        setPost(EmployeeData);
        setWaiter(true);
    }, []);

    return (
        <div>
            {!waiter &&
                <div>
                    <h1>Loading...<Spinner animation="border" /></h1>
                </div>
            }
            {waiter &&
                <div className="d-flex justify-content-between flex-wrap">
                    
                    {post.map((employee) => {
                        return (
                            <SingleStaff
                                id={employee.Id}
                                key={employee.Id}
                                firstName={employee.FirstName}
                                lastName={employee.LastName}
                                employeePosition={employee.EmployeePosition}
                                shortDescription={employee.ShortDescription}
                                longDescription={employee.LongDescription}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}
export default StaffList;