import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { getalluserdataa, updateuserdata } from "services/webservices/user/api";
import Image from "next/image";
import { Button, Col, Modal, ModalBody, Row, Table } from "react-bootstrap";
import logo from "../../../public/images/nafav.jpeg";
import url from "services/endpoint.action";
function UserManagement() {
  const [user, setUser] = React.useState<any>([]);
  const [modaldetail, setModaldetail] = React.useState<any>();
  const [modelopen, setModelopen] = React.useState<any>(false);

  useEffect(() => {
    getuserdata();
  }, []);

  const getuserdata = async () => {
    let response = await getalluserdataa();
    setUser([...response.responseData.ListofUser]);
    console.log("user approve", response.responseData.ListofUser);
  };
  const viewButton = (detail: any) => {
    console.log("Id of model", detail);
    setModaldetail(detail);
    setModelopen(true);
  };

  const checkboxclick = async (actionss: any, e) => {
    console.log("e.target.checked", e.target.checked);
    let body = { status: e.target.checked ? "Active" : "Inactive" };
    let userId = actionss._id;
    let response = await updateuserdata(userId, body);
    getuserdata();
  };

  return (
    <>
      <div>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Sr.</th>
              <th scope="col">Username</th>
              <th scope="col">Email </th>
              <th scope="col">Action</th>
              <th scope="col" className="statusfield">
                Status
              </th>
            </tr>
          </thead>
          {user.map((users, i) => {
            return (
              <tbody>
                <tr>
                  <th scope="col">{i + 1}</th>
                  <th>{users.userName}</th>
                  <th> Email:- {users.emailId}</th>
                  <th>
                    <>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => viewButton(users)}
                      >
                        View <FiArrowRight />
                      </button>
                    </>
                  </th>
                  <th>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        style={{ textAlign: "center", fontSize: "25px" }}
                        type="checkbox"
                        role="switch"
                        id="swiii"
                        // checked={Cobj}
                        // {...Cobj}
                        checked={users.status === "Active" ? true : false}
                        onChange={(e) => checkboxclick(users, e)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                        style={{ textAlign: "center", marginTop: "6px" }}
                      >
                        Active
                      </label>
                    </div>
                  </th>
                </tr>
              </tbody>
            );
          })}
          <Modal
            show={modelopen}
            size="xl"
            onHide={() => {
              setModelopen(false);
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <Image src={logo} alt="meet" width="90" height="70" />
                <span>
                  {" "}
                  {/* Details Of :- {modaldetail?.personalDetails?.fullName} */}
                </span>
              </Modal.Title>
            </Modal.Header>
           <Modal.Body>
              <div className="container rounded bg-info mb-3">
                <div className="row">
                  <div className="col-md-5 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <div className="d-flex flex-column align-items-center text-center">
                        <h4 className="text-right"> Details Of :-</h4>
                      </div>
                      <span className="font-weight-bold">{modaldetail?.personalDetails?.fullName}</span>
                      <span className="text-black-50">{modaldetail?.emailId}</span>
                      <span> </span>
                      </div>
                      <div className="d-flex flex-column align-items-center text-center">
                        <h4 className="text-right">Profile Information</h4>
                      </div>
                      <div className="d-flex flex-column align-items-center text-center">
                          <label className="text-black-50">Full Name:-</label>
                          <input
                            type="text"
                            className="form-control"
                            value={modaldetail?.personalDetails.fullName}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Address Line 1</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="enter address line 1"
                            value=""
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Address Line 2</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="enter address line 2"
                            value=""
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Postcode</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="enter address line 2"
                            value=""
                          />
                        </div>
                        <div className="col-md-12 mb-4">
                          <label className="labels">State</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="enter address line 2"
                            value=""
                          />
                        </div>
 
                  </div>
                  <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right"> Other Information</h4>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-15">
                          <label className="labels">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={modaldetail?.personalDetails?.fullName}
                          />
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-12">
                          <label className="labels">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            value={modaldetail?.personalDetails.phoneNumber}
                          />
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mt-3">
                        <h4 className="text-right"> Other Information</h4>
                      </div>
                        <div className="col-md-12">
                          <label className="labels">Area</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="enter address line 2"
                            value=""
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Email ID</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="enter email id"
                            value=""
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Education</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="education"
                            value=""
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="labels">Country</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="country"
                            value=""
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="labels">State/Region</label>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            placeholder="state"
                          />
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setModelopen(false);
                }}
              >
                Close
              </Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal>
        </table>
      </div>
    </>
  );
}

export default UserManagement;


