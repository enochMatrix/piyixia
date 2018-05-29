import React ,{Component} from 'react';
import {connect} from "react-redux";
import {Text,ListView,RefreshControl} from "react-native";
class loadPlaceScreen extends Component{
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            refreshing: false

        };
    }
    _onRefresh() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({refreshing: true,
            dataSource: ds.cloneWithRows([' ','row 1', 'row 2']),
        });
       setInterval(()=> {
           this.setState({refreshing: false,
               dataSource: ds.cloneWithRows(['row 1', 'row 2']),})
       },3000)
    }
    render(){



        return(
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        );
    }

}


export default loadPlaceScreen;