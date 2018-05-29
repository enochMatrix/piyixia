import React, {Component} from 'react';
import {Animated,} from 'react-native';

class DynamicListRow extends Component {

    _defaultTransition  = 500;

    state = {
        _rowOpacity : new Animated.Value(0)
    };

    componentDidMount() {
        Animated.timing(this.state._rowOpacity, {
            toValue  : 1,
            duration : this._defaultTransition
        }).start()
    }

    render() {
        return (
            <Animated.View
                style={{opacity: this.state._rowOpacity}}>
                {this.props.children}
            </Animated.View>
        );
    }
}

export default DynamicListRow;