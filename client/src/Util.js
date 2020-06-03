import axios from 'axios';

const urlBase = 'http://localhost:3001';

/*export function signOutUser(){
  const currentUser = getCurrentUser();

  if(currentUser !== null){
    currentUser.signout();
  }
}*/

export function getListofContacts(){
  const url = '${urlBase}/contact';
   return axios.get('/searchContacts').then(response => response.data);
}

export function addContact(contact){

  console.log('adding frontend', contact);

    return axios.post('/addContact', contact).then((response) => response.data);
}

export function deleteContact(contactID){
  const url = '/delete';
  console.log('route', urlBase);

 var id = {'_id': contactID};

  return axios.post(url, id);
}
