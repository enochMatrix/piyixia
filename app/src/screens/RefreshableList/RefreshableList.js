import React, {Component} from 'react';
import {ListView, RefreshControl} from 'react-native';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import DynamicListRow from "../../components/DynamicListRow/DynamicListRow";
class RefreshableList extends Component {

    // set state and list view data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows(['row 1', 'row 1','row 2','row 2']),
        };
    }

    // // fetch Data
    // componentDidMount() {
    //     this.fetchTopicsData();
    // }
     // user fetch data and refresh page , call spiner

    _onRefresh() {
        this.setState({refreshing: true});
        // fetchData().then(() => {
        //     this.setState({refreshing: false});
        // });

        // simulate fetch data process using setinterval
        setInterval( () => {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                refreshing: false,
                dataSource: ds.cloneWithRows(['row 3','row 1','row 1', 'row 2','row 2']),
            });
        }, 2000)
    }

    _renderRow = (rowData) => {
        return (
            <DynamicListRow>
                <Card>
                    <CardImage
                        source={{uri: 'http://bit.ly/2GfzooV'}}
                        title="Top 10 South African beaches"
                        resizeMode="contain"
                    />
                    <CardTitle
                        subtitle="Number 6"/>
                    <CardContent text={rowData} />
                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={() => {}}
                            title="Share"
                            color="#FEB557"
                        />
                        <CardButton
                            onPress={() => {}}
                            title="Explore"
                            color="#FEB557"
                        />
                    </CardAction>
                </Card>
            </DynamicListRow>
        )
    };

    render() {
        return (
            <ListView
                style={this.state.refreshing ? {paddingTop: 50} : null }
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        colors={['black','blue']}
                        progressViewOffset={50}/>
                }
                removeClippedSubviews/>
        )
    }
}




export default RefreshableList;
