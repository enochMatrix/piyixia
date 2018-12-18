import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimension from 'Dimensions';
import {StyleSheet, Image} from 'react-native';

import bgsrc from '../../Common/img/1026.png';

export default class WallPaper extends Component {

    render() {
        <Image style={styles.picture} source={bgsrc}>
            { this.props.children }
        </Image>

    }

}

const styles = StyleSheet.create(
{
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'

      }
    }
);