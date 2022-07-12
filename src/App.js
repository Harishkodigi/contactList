import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import SearchBar from "./SearchBar";
import DataSet from "./jsonData";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>Harishkumar</h1>
//       <button className="btn btn-primary">Hiii</button>
//     </div>
//   );
// }

// export default App;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataSet: DataSet,
      nameList: [],
      selectedUser: "",
      showModal: false,
      updateUserModal:false,
      selectedGroup: "Family",
      formFeilds: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
      },
    };
  }

  handleNameList = () => {
    const { userDataSet } = this.state;
    let nameList = [];
    userDataSet.map((data) => {
      nameList.push(data.name);
    });
    this.setState({ nameList, showModal: false });
  };

  componentDidMount() {
    this.handleNameList();
  }

  handleSelected = (data) => {
    console.log(data, "parent");

    let selectedUser = DataSet.find((element) => element.name === data);
    console.log(selectedUser, "sledddddd");
    this.setState({ selectedUser });
  };

  handleInput = (e) => {
    const { formFeilds } = this.state;
    const { name, value } = e.target;
    formFeilds[name] = value;
    this.setState({ formFeilds });
  };

  handleSelectGroup = (e) => {
    let selectedGroup = e.target.value;
    this.setState({ selectedGroup });
  };

  handleAddNewUser = () => {
    const { formFeilds, userDataSet, selectedGroup } = this.state;
    let newName =
      formFeilds.first_name +
      " " +
      formFeilds.middle_name +
      " " +
      formFeilds.last_name;
    let newList = userDataSet;
    newList.push({
      name: newName,
      email: formFeilds.email,
      group: selectedGroup,
    });
    this.setState({ userDataSet: newList }, () => this.handleNameList());
  };

  handleUpdateUser = (id) => {
    const { formFeilds, userDataSet, selectedGroup } = this.state;
    let newName =
      formFeilds.first_name +
      " " +
      formFeilds.middle_name +
      " " +
      formFeilds.last_name;
    let userList = userDataSet;
    let indexMatch = userDataSet.findIndex((element) => element.id === id);
    userList[indexMatch].name = newName
    userList[indexMatch].email = formFeilds.email
    userList[indexMatch].group = selectedGroup

    this.setState({ userDataSet: userList,updateUserModal:false }, () => this.handleNameList());
  };

  handleEditNewUser = () => {
    const { formFeilds, selectedUser,selectedGroup } = this.state;
    console.log(formFeilds, selectedUser,selectedGroup, 'edittttttttt')
    let newName = selectedUser.name.split(/[ ]/)
    console.log(newName)
    if (newName.length === 3 ) {
      formFeilds.first_name = newName[0]
      formFeilds.middle_name = newName[1]
      formFeilds.last_name = newName[2]
    } else {
      formFeilds.first_name = newName[0]
      formFeilds.last_name = newName[1]
    }
    formFeilds.email = selectedUser.email
    this.setState({ formFeilds,updateUserModal: true});
  };

  handleDeleteUser = (id) => {
    const { userDataSet } = this.state;
    let userList = userDataSet;
    let indexMatch = userDataSet.findIndex((element) => element.id === id);
    userList.splice(indexMatch, 1);
    console.log("indexMatch", indexMatch, userList);
    this.setState({ userDataSet: userList, selectedUser: "" }, () =>
      this.handleNameList()
    );
  };
  render() {
    const { nameList, selectedUser, showModal,updateUserModal, formFeilds } = this.state;
    const { first_name, middle_name, last_name, email } = formFeilds;
    console.log(selectedUser);
    return (
      <Fragment>
        <h1 className="text-center pt-5">User details</h1>

        <div class="container py-4">
          <div class="row gx-5">
            <div class="col-4">
              <SearchBar
                products={nameList}
                selected={(data) => this.handleSelected(data)}
              />
              <div className="row justify-content-center">
                <button
                  type="button"
                  class="btn btn-primary btn-lg mt-3"
                  onClick={() => this.setState({ showModal: true })}
                >
                  ADD
                </button>
              </div>
            </div>
            <div class="col-8">
              {selectedUser !== "" && (
                <div className="row justify-content-center">
                  <div className="col-4">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar2.png"
                      alt=""
                      className="image_tag"
                    ></img>
                  </div>
                  <div className="col-8 mt-4">
                    <h1 className="pt-5">Name:{selectedUser.name}</h1>
                    <h3 className="py-3">Email:{selectedUser.email}</h3>
                    <h3>Group:{selectedUser.group}</h3>
                  </div>
                </div>
              )}
              {selectedUser !== "" && (
                <div className="row mt-5 justify-content-between mr-10px">
                  <div className="col-4">
                    <div
                      className="btn-group "
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-secondary">
                        Share
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-share pl-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-info ml-2"
                        onClick={() => this.handleEditNewUser()}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="col-4">
                    <button
                      type="button"
                      className="btn btn-danger ml-2"
                      onClick={() => this.handleDeleteUser(selectedUser.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {updateUserModal === true && (
          <Modal show={true}>
            <Modal.Header
              closeButton
              onClick={() => this.setState({ updateUserModal: false })}
            >
              <Modal.Title>New User</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="row justify-content-center">
                <div className="col-4">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar2.png"
                    alt=""
                    className="image_tag"
                  ></img>
                </div>
                <div className="col-8">
                  <form>
                    <div class="form-group">
                      <label for="first_name">First Name</label>
                      <input
                        class="form-control"
                        placeholder="First Nmae"
                        name="first_name"
                        value={first_name}
                        onChange={(e) => this.handleInput(e)}
                      ></input>

                      <label for="middle_name">Middle Name</label>
                      <input
                        class="form-control"
                        placeholder="Middle Nmae"
                        name="middle_name"
                        value={middle_name}
                        onChange={(e) => this.handleInput(e)}
                      ></input>
                      <label for="last_name">Last Name</label>
                      <input
                        class="form-control"
                        placeholder="Last Nmae"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => this.handleInput(e)}
                      ></input>

                      <label for="email">Email address</label>
                      <input
                        type="email"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => this.handleInput(e)}
                      ></input>
                    </div>
                    <h5>Group</h5>
                    <select
                      id="cars"
                      onClick={(e) => this.handleSelectGroup(e)}
                    >
                      <option value="Family">Family</option>
                      <option value="Friends">Friends</option>
                      <option value="School">School</option>
                      <option value="Work">Work</option>
                    </select>
                    {/* <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        ></input>
                      </div>
                      <div class="form-group form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                        ></input>
                        <label class="form-check-label" for="exampleCheck1">
                          Check me out
                        </label>
                      </div> */}
                  </form>
                  <div className="row mt-5 justify-content-between">
                    <div className="col-4">
                      <button
                        type="button"
                        className="btn btn-secondary ml-2"
                        onClick={() => this.setState({ updateUserModal: false })}
                      >
                        Cancel
                      </button>
                    </div>
                    <div
                      className="col-2"
                      onClick={() => this.handleUpdateUser(selectedUser.id)}
                    >
                      <button type="button" className="btn btn-secondary ml-2">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>

            {/* <Modal.Footer>
              </Modal.Footer> */}
          </Modal>
        )}
        {showModal === true && (
          <Modal show={true}>
            <Modal.Header
              closeButton
              onClick={() => this.setState({ showModal: false })}
            >
              <Modal.Title>New User</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="row justify-content-center">
                <div className="col-4">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar2.png"
                    alt=""
                    className="image_tag"
                  ></img>
                </div>
                <div className="col-8">
                  <form>
                    <div class="form-group">
                      <label for="first_name">First Name</label>
                      <input
                        class="form-control"
                        placeholder="First Nmae"
                        name="first_name"
                        value={first_name}
                        onChange={(e) => this.handleInput(e)}
                      ></input>

                      <label for="middle_name">Middle Name</label>
                      <input
                        class="form-control"
                        placeholder="Middle Nmae"
                        name="middle_name"
                        value={middle_name}
                        onChange={(e) => this.handleInput(e)}
                      ></input>
                      <label for="last_name">Last Name</label>
                      <input
                        class="form-control"
                        placeholder="Last Nmae"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => this.handleInput(e)}
                      ></input>

                      <label for="email">Email address</label>
                      <input
                        type="email"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => this.handleInput(e)}
                      ></input>
                    </div>
                    <h5>Group</h5>
                    <select
                      id="cars"
                      onClick={(e) => this.handleSelectGroup(e)}
                    >
                      <option value="Family">Family</option>
                      <option value="Friends">Friends</option>
                      <option value="School">School</option>
                      <option value="Work">Work</option>
                    </select>
                    {/* <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        ></input>
                      </div>
                      <div class="form-group form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                        ></input>
                        <label class="form-check-label" for="exampleCheck1">
                          Check me out
                        </label>
                      </div> */}
                  </form>
                  <div className="row mt-5 justify-content-between">
                    <div className="col-4">
                      <button
                        type="button"
                        className="btn btn-secondary ml-2"
                        onClick={() => this.setState({ showModal: false })}
                      >
                        Cancel
                      </button>
                    </div>
                    <div
                      className="col-2"
                      onClick={() => this.handleAddNewUser()}
                    >
                      <button type="button" className="btn btn-secondary ml-2">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>

            {/* <Modal.Footer>
              </Modal.Footer> */}
          </Modal>
        )}
      </Fragment>
      // <NameChanger handleChange={this.changeName} />
    );
  }
}

export default App;
