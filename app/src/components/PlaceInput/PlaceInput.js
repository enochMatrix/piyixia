import React from "react";
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props => (

          <DefaultInput placeholder="Place Name"
                        onChangeText={props.onChangeText}
                        value={props.placeName}
                        {...props} />
    );
export default placeInput;
