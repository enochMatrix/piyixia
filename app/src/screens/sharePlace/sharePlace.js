import React ,{Component} from 'react';
import {View, Text, TextInput, Button,StyleSheet,ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions/index';
import PlaceInput from '../../components/InputPlace/InputPlace';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from "../../components/PickLocation/PickLocation";


 class sharePlaceScreen extends Component{
     static navigatorStyle ={
         navBarButtonColor:"orange"
     }

     state={
         placeName:'',
         location:{
             value:null,
             valid:false,

         },
         image:{
             value:null,
             valid:false
         }
     };

     constructor(props){
         super(props);

         this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
     }

     placeNameChangedHandler=(val)=>{

         this.setState({

             placeName: val

         })
     };

     onNavigatorEvent =event=>{
         console.log(event);
         if(event.type==="NavBarButtonPress"){
             if(event.id==="sideDrawerToggle"){
                 this.props.navigator.toggleDrawer({
                     side:'left'
                 })
             }
         }
         // console.log(event);
     };
     //combine the button and sideDrawer

     placeAddedHandler = () => {
         if(this.state.placeName.trim()!==''){
             this.props.onAddPlace(this.state.placeName,
                 this.state.location.value,
                 this.state.image.value);
         }

     };

     locationPickHandler=location=>{
         this.setState(preState=> {
                 return {
                     ...preState,
                     location:{
                         value:location,
                         valid:true,
                     }
                 }
             })
     };

     imagePickedHandler=image=>{
         this.setState(preState=>{
             return{
                 ...preState,
                 image:{
                     value:image,
                     valid:true
                 }
             }
         })

     };

     render(){
         let submitButton =
             <Button title="share the place" onPress={this.placeAddedHandler}
                                   disabled={!this.state.location.valid||!this.state.placeName||!this.state.image}/>;
         if(this.props.isLoading){
             submitButton =<ActivityIndicator
                 size="large" color="#0000ff"/>
         }

         return(
             <ScrollView>
                 <View style={styles.container}>
                     <MainText>
                         <HeadingText>
                             share a place with us
                         </HeadingText>
                     </MainText>
                     <PickImage onImagepick={this.imagePickedHandler}/>
                  <PickLocation onLocationPick={this.locationPickHandler}/>
                 <PlaceInput  placeName={this.state.placeName}
                 onChangeText={this.placeNameChangedHandler}/>
                     <View
                     style={styles.button}>
                         {submitButton}
                         </View>

                 </View>
             </ScrollView>
         )

     }
 }
const mapStateToProps = state => {
    return {
        ui: state.ui.isLoading,
    };
};

 const mapDispatchToProps =dispatch =>{
    return{
        onAddPlace: (name,location,image) => dispatch(addPlace(name,location,image)),
    }

 };

 const styles= StyleSheet.create({
     container:{
        flex:1,
         alignItems:"center",
     },
     placeholder:{
         borderWidth:1,
         borderColor: 'black',
         backgroundColor:'#eee',
         margin:5,
         width:"80%",
         height: 150
     },
     button:{
         margin: 8
     },
     previewImage:{
         width:"100%",
         height:"100%"
     }
 });

 export default connect(mapStateToProps,mapDispatchToProps)(sharePlaceScreen);