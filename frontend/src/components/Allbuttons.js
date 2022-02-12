import React from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import validator from "validator";

export default function Allbuttons() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [name2, setName2] = useState("");
  const [phoneno2, setPhoneNo2] = useState("");
  const [email2, setEmail2] = useState("");
  const [hobbies2, setHobbies2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");
  const addShow = () => setShow1(true);
  const addClose = async (e) => {
    if (
      !validator.isEmail(email) ||
      name.length <= 0 ||
      phoneno.toString().length < 10 ||
      phoneno.toString().length > 10 ||
      hobbies.length <= 0
    ) {
      setError("Please Enter Valid Details!");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/users/addData",
          { name, phoneno, email, hobbies },
          config
        );
        console.log(data);
        window.location.reload(true);
        setShow1(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const delShow = () => setShow2(true);
  const delClose = async (e) => {
    if (id.length == 0) {
      setError("Please Enter ID!");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/users/getCount",
          { id },
          config
        );
        console.log(data);
        if (data == 0) {
          setError("Please Enter Valid ID!");
        } else {
          setShow2(false);
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "/api/users/delData",
              { id, name, phoneno, email, hobbies },
              config
            );
            console.log(data);
            window.location.reload(true);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const upShow = () => setShow3(true);
  const addClose2 = () => setShow1(false);
  const delClose2 = () => setShow2(false);
  const upClose2 = () => setShow3(false);
  const upClose = async (e) => {
    if (
      !validator.isEmail(email2) ||
      name2.length <= 0 ||
      phoneno2.toString().length < 10 ||
      hobbies2.length <= 0
    ) {
      setError("Please Enter Valid Details!");
    } else if (id2.length == 0) {
      setError("Please Enter ID!");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/users/getCount2",
          { id2 },
          config
        );
        console.log(data);
        if (data === 0) {
          setError("Please Enter Valid ID!");
        } else {
          setShow3(false);
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "/api/users/updateData",
              { id2, name2, phoneno2, email2, hobbies2 },
              config
            );
            console.log(data);
            window.location.reload(true);
          } catch (error) {
            window.location.reload(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="mt-2">
      <Button style={{ marginLeft: 650 }} onClick={addShow}>
        Add
      </Button>
      <Modal show={show1} onHide={addClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />{" "}
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={phoneno}
              placeholder="Enter Phone Number"
              onChange={(e) => setPhoneNo(e.target.value)}
            />{" "}
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={hobbies}
              placeholder="Enter Hobbies"
              onChange={(e) => setHobbies(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={addClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Button style={{ marginLeft: 50 }} onClick={delShow}>
        Delete
      </Button>
      <Modal show={show2} onHide={delClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Data</Modal.Title>
        </Modal.Header>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={id}
              placeholder="Enter ID"
              onChange={(e) => setId(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={delClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={delClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Button style={{ marginLeft: 50 }} onClick={upShow}>
        Update
      </Button>
      <Modal show={show3} onHide={upClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={id2}
              placeholder="Enter ID"
              onChange={(e) => setId2(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={name2}
              placeholder="Enter Name"
              onChange={(e) => setName2(e.target.value)}
            />{" "}
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={phoneno2}
              placeholder="Enter Phone Number"
              onChange={(e) => setPhoneNo2(e.target.value)}
            />{" "}
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={email2}
              placeholder="Enter Email"
              onChange={(e) => setEmail2(e.target.value)}
            />{" "}
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default1"
              aria-describedby="inputGroup-sizing-default1"
              value={hobbies2}
              placeholder="Enter Hobbies"
              onChange={(e) => setHobbies2(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={upClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={upClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
