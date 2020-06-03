import React, { StyleSheets,Component } from 'react';
import './Styles/CS.css';
import { getListofContacts, deleteContact, addContact } from '../Util';
import axios from 'axios';
import {
  Jumbotron,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  InputGroup,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Modal,
} from 'react-bootstrap';

class ContactSearch extends Component{
  constructor(props){
    super(props);
    this.state = {
      listOfContacts:[],
      _userId:'',
      _id:'', 
      fname:'',
      lname:'',
      phone_number:'',
      email:'',
      show:false,
      add:false,
      index:0,
      sort:'name', 
      search:'',
      filteredList:[]
    };
  };
  componentDidMount(){
    getListofContacts().then((listOfContacts) => {
      this.setState({listOfContacts:listOfContacts});
     // this.state.sort=='name'?this.sortByFirstName():this.sortByLastName();
    });
  }

  apiGetContacts(){
    getListofContacts().then((listOfContacts) => {
      this.setState({listOfContacts:listOfContacts});
      this.state.sort=='name'?this.sortByFirstName():this.sortByLastName();
    });
  }

  createContact () {
    //e.preventDefault();
    var a = {
      "_userId":this.props.id,
      "fname":this.state.fname,
      "lname":this.state.lname,
      "phone_number":this.state.phone_number,
      "email":this.state.email
    };
   
    this.setState({update : a})
    addContact(a).then((list) => {
      console.log(list);
      this.setState({listOfContacts:list});
      this.state.sort=='name'?this.sortByFirstName():this.sortByLastName();
    });
      
//      this.state.sort=='name'?this.sortByFirstName():this.sortByLastName();
    this.setState({add:false});
    //this.clearUpdate();
   // this.setState({add:false})
  }

  clearUpdate(){

    this.setState({
      "_userId":'',"_id":'', "fname":'', "lname":'', "email":'', "phone_number":''
    });
  }

  delete(id){
    console.log('this is the id', id);
    //deleteContact(id);
    var _id = { '_id':id};
    axios.post('/delete', _id).then( (result) => {
      this.setState({listOfContacts:result.data});
      this.state.sort=='name'?this.sortByFirstName():this.sortByLastName();
    });
    
    
      
  }

  handleShow (index){
   this.setState({ show: true, index: index });

 };

 handleClose() {
    this.setState({ show: false });
  }

  formatPhone(phone) {

    var temp = phone.substring(0,3);
    var temp2 = phone.substring(3,6);
    var temp3 = phone.substring(6);
    var format = "("+temp+") "+temp2+"-"+temp3;

    return format;

  }

  searchForContact(str) {

    let list = this.state.listOfContacts;
    list = list.filter(function(list) {
      return list.fname.indexOf(str) != -1;
    });
    this.setState({filteredList:list});

  }

  sortByFirstName = () =>{
    
    var temp = this.state.listOfContacts;
    temp.sort((a,b) => a.fname.localeCompare(b.fname));
    this.setState({listOfContacts: temp, sort:'name'});
  };

  sortByLastName = () =>{
    var temp = this.state.listOfContacts;
    temp.sort((a,b) => a.lname.localeCompare(b.lname));
    this.setState({listOfContacts: temp, sort:'last'});
  };

  onChange = (e) => {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  testSearch(){
    return(
      
      this.state.filteredList.map((data, index) =>(
        
  
        <ListGroupItem key={index}>
          {console.log(data)}
          {/*this.editContact()*/}
           <span class="nameHeader">{data.fname+" "+data.lname}</span>
  
         <span class="pull-right nameHeader">
          <ButtonToolbar>
           <Button bsStyle={"info"}
             onClick={() => {this.handleShow(index)}}
           ><Glyphicon glyph="pencil" /></Button>
           <Button bsStyle={"danger"}
           onClick={()=> {this.delete(data._id)}}
           ><Glyphicon glyph="trash" /></Button>
         </ButtonToolbar></span>
  
          <ul class="list-unstyled">
            <li>Phone: {this.formatPhone(data.phone_number)}</li>
            <li>Email: {data.email}</li>
          </ul>
        </ListGroupItem>
  
        
    )));
    };
  
  test () {
console.log("username", this.props._userName);
//const mapList = this.state.search!=='' ? this.state.filteredList:this.state.listOfContacts;
    return(
      
    this.state.listOfContacts.map((data, index) =>(
      

      <ListGroupItem key={index}>
        {console.log(data)}
        {/*this.editContact()*/}
         <span class="nameHeader">{data.fname+" "+data.lname}</span>

       <span class="pull-right nameHeader">
        <ButtonToolbar>
         <Button bsStyle={"info"}
           onClick={() => {this.handleShow(index)}}
         ><Glyphicon glyph="pencil" /></Button>
         <Button bsStyle={"danger"}
         onClick={()=> {this.delete(data._id)}}
         ><Glyphicon glyph="trash" /></Button>
       </ButtonToolbar></span>

        <ul class="list-unstyled">
          <li>Phone: {this.formatPhone(data.phone_number)}</li>
          <li>Email: {data.email}</li>
        </ul>
      </ListGroupItem>

      
  )));
  };

  editContact (){

    const data = this.state.listOfContacts[this.state.index];
    var update = {"id":'', "firstname":'', "lastname":'', "email":'', "phone":'',"facebook":'',"twitter":''};

    //var index = this.state.index;
    console.log("index "+data);
    console.log("data "+this.state.show );
    return(

      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>{"Editing Contact: "+data.firstname+" "+data.lastname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal
           >

            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel}
                sm={2}
                smOffset={2}
                >Name:</Col>
              <Col sm={4}>
                <FormControl
                  type="text"
                  name="firstname"
                  defaultValue={ data.firstname }

                  onChange={ this.onChange }
                  />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalLastN">
              <Col componentClass={ ControlLabel }
                sm={2} smOffset={2}>Last Name:</Col>
              <Col sm={4}>
                <FormControl
                  type="text"
                  name="lastname"
                  defaultValue={ data.lastname }
                  onChange={ this.onChange }
                  />
                <FormControl.Feedback />
              </Col>
          </FormGroup>

                  <FormGroup
                    controlId="formHorizontalEmail">
                  <Col componentClass={ ControlLabel }
                  sm={2} smOffset={2}>Email:</Col>
                <Col sm={4}>
                  <FormControl
                    type="email"
                    name="email"
                    defaultValue={data.email}
                    onChange={this.onChange}
                    />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPhone">
                <Col componentClass={ ControlLabel }
                  sm={2} smOffset={2}>Phone:</Col>
                <Col sm={4}>
                  <FormControl
                    type="text"
                    name="phone"
                    defaultValue={data.phone}
                    onChange={this.onChange}
                    />
                </Col>
              </FormGroup>

        </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* cancel and save buttons goes here */}
          <ButtonToolbar class="pul-right">
              <Button type="submit"
                bsStyle="primary"
                onClick={ this.createContact }
                ><Glyphicon glyph="save"/>Save</Button>
                <Button
                  bsStyle="danger"
                  onClick={ ()=> {this.handleClose()} }
                  >Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );

  };

  onChangeSearch = (list) => {
    var x = this.state.search;
    x = list.target.value;
    this.setState({
      search: x
    });
    this.searchForContact(this.state.search);
  };

  render(){
   // const {firstname, lastname, email, phone, facebook, twitter} = this.state;

    return(
      <div class="container">
        {/* This the code for the label */}

          <h2>Hello, { this.props.nombre } </h2>


        {/* This the code for the search bar */}
        <Col sm={6} smOffset={3}>
        <FormGroup>
          <InputGroup>
          <FormControl type="text" placeholder="Ex. " value={this.state.search} onChange={this.onChangeSearch}/>
          <InputGroup.Button>
            <Button type="submit"><Glyphicon glyph="search" /> Search</Button>
          </InputGroup.Button>
        </InputGroup>
        </FormGroup>
        </Col>

{/* These lines display the contacts */}

        <Col sm={6} smOffset={3}>
          <h4>Order by:</h4>
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="sortType" defaultValue={1}>
          <ToggleButton onChange={this.sortByFirstName.bind(this)} value={1}>First Name</ToggleButton>
          <ToggleButton onChange={this.sortByLastName.bind(this)} value={2}>Last Name</ToggleButton>
          </ToggleButtonGroup>
<span class="pull-right" onClick={()=>{this.setState({add:true})}}><Button ><Glyphicon glyph="plus"/> Add Contact</Button></span>
        </ButtonToolbar>

        </Col>
        {/* This render the list of contacts */}

  <Col md={6} mdOffset={3}  >
    <div class="conatiner List">
      <Col md={12}  >

<ListGroup>

        { this.state.search===''?this.test():this.testSearch() }

    </ListGroup>
  </Col>
</div>

    </Col>
    <Modal  show={this.state.add} onHide={()=>{this.setState({add:false})}}>
      <Modal.Header closeButton>
        <Modal.Title>{"Create a Contact"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal
          onSubmit={ this.createContact }>

          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel}
              sm={2}
              smOffset={2}
              >Name:</Col>
            <Col sm={4}>
              <FormControl
                type="text"
                name="fname"
                value={ this.state.fname }
                onChange={ this.onChange }
                />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup
            controlId="formHorizontalLastN">
            <Col componentClass={ ControlLabel }
              sm={2} smOffset={2}>Last Name:</Col>
            <Col sm={4}>
              <FormControl
                type="text"
                name="lname"
                value={ this.state.lname }
                onChange={ this.onChange }
                />
              <FormControl.Feedback />
            </Col>
        </FormGroup>

                <FormGroup
                  controlId="formHorizontalEmail">
                <Col componentClass={ ControlLabel }
                sm={2} smOffset={2}>Email:</Col>
              <Col sm={4}>
                <FormControl
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPhone">
              <Col componentClass={ ControlLabel }
                sm={2} smOffset={2}>Phone:</Col>
              <Col sm={4}>
                <FormControl
                  type="text"
                  name="phone_number"
                  value={this.state.phone_number}
                  onChange={this.onChange}
                  />
              </Col>
            </FormGroup>

      </Form>
      </Modal.Body>
      <Modal.Footer>

        <ButtonToolbar>
            <Button 
              bsStyle="primary"
              onClick={()=>{this.createContact()}}
              ><Glyphicon glyph="save"/>Save</Button>
              <Button
                bsStyle="danger"
                onClick={ ()=>{this.setState({add:false})} }
                >Cancel</Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Modal>



    </div>

    );
  }
}



export { ContactSearch };
