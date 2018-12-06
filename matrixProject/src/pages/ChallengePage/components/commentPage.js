import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import AComment from './AComment';
import firebase from 'firebase';
import 'firebase/firestore/dist/index.cjs'


class commentPage extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = ({
      comment: ''
    });
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
  }

  config = {
    apiKey: "AIzaSyApicAg8teSzkggqcaGqHnv3T_VFedXZPE",
    authDomain: "piyixia-562cf.firebaseapp.com",
    databaseURL: "https://piyixia-562cf.firebaseio.com",
    projectId: "piyixia-562cf",
    storageBucket: "piyixia-562cf.appspot.com",
    messagingSenderId: "157139696379"
  };



  componentWillMount() {
    var docRef = this.db.collection("Comment");
    var json = [];
    console.log(docRef);
    docRef.get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        json.push(doc.data());
      }) }).then(() => {
        this.setState({ comment: json });
       
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }

    renderItem = ({ item }) => {
        return (
          <AComment
            user={item.author}
            date={item.date}
            content={item.content}
            profile={item.profile}
          />
        );
      }

    render() {
        console.log(this.state.comment);
        return(
                <View>
      <View style={styles.center}>
        <Text>评论</Text>
      </View>
      <View style={styles.line} />
      <FlatList
        data={this.state.comment}
        renderItem={this.renderItem}
        extraData={this.state}
      //keyExtractor={item => item.title}
      //refreshing={this.state.refreshing}
      //onRefresh={this.handleRefresh}
      />
                </View >
        );
  }
}

const styles = {
  line: {
    backgroundColor: 'gray',
    height: 0.5,
    marginHorizontal: '1%'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
};

export default commentPage;
