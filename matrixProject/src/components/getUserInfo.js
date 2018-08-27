import React, { Component } from 'react';

class getUserInfo extends Component {
  fetch('http://192.168.10.107:3000/get/transaction', {
      credentials: 'same-origin',
  })
      .then((response) => (response.json()))
      .catch((error) => {
          console.log(error);
      })
      .then((res) => {
          console.log(res['0']);
          this.setState({
            transaction: res['0']['transaction'] ,
            userName: res['0']['username'],
            avatar: res['0']['avatar'],
            diamond: res['0']['diamond']
          });
      });
};

export default getUserInfo;
