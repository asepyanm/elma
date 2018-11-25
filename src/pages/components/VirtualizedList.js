import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import Axios from 'axios';
import { Divider, Button } from 'react-native-elements';

export default class VirtualizedList extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    Axios.get(`http://elma.myadais.com/api/ebis_getnotificationproject/status/${this.props.status}`)
    .then(res => this.setState({data: res.data})) 
  }

  renderItem({ item }){
    return(
      <View style={styles.rowContainer}>
        <View style={{ width: '25%', alignItems: 'center' }}>
          <Text style={{ fontSize: 12}} >{item.NAMACC}</Text>
        </View>
        <View style={{ width: '50%', alignItems: 'center' }}>
          <Text style={{ fontSize: 12}} >{item.NAMAPROJECT}</Text>
        </View>
        <View style={{ width: '20%', alignItems: 'center' }}>
          <Text style={{ fontSize: 12}} >{item.REVCURRYEAR}</Text>
        </View>
      </View>
    )
  }

  renderHeader(){
    return(
      <View style={[styles.rowContainer, { backgroundColor: '#222' }]}>
        <View style={{ width: '25%', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: 'white'}} >NAMA CC</Text>
        </View>
        <View style={{ width: '50%', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: 'white'}} >NAMA PROJECT</Text>
        </View>
        <View style={{ width: '20%', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: 'white'}} >NILAI</Text>
        </View>
      </View>
    )
  }

  renderSeparator(){
    return <Divider />
  }

  renderFooter(){
    return (
      <Button
          title="Back"
          onPress={() => this.props.onBack()}
      />
    )
  }

  render(){
    if(this.state.data.length < 1){
      return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    }
    return(
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          ListHeaderComponent={this.renderHeader.bind(this)}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          // ListFooterComponent={this.renderFooter.bind(this)}
        />
        <Button
          title="Back"
          onPress={() => this.props.onBack()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
    
  }
})