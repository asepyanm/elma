import React, { Component } from 'react';
import {FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Card, CardItem } from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';

//global
import url from '../../config/api_service';

class DashboardDetail extends Component {
  constructor(props){
    super(props)
    const {params} = this.props.navigation.state;
    this.state = {
      id: params.id
    }
  }


  componentWillMount(){
    console.log(this.state.id);
    this.props.dispatch({
      type:'DASHBOARD_DETAIL',
      payload:axios.get(`${url.MAIN_API}/detailInfo&id=${this.state.id}`)
    })
  }

  render() {
    const {navigation, judul, konten} = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='Ionicons' name='md-arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>Detail Info</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>{judul}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  {konten}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  judul: state.dashboardDetailReducer.judul,
  konten: state.dashboardDetailReducer.konten,
  create_by: state.dashboardDetailReducer.create_by,
  create_time: state.dashboardDetailReducer.create_time
})

export default connect(mapStateToProps)(DashboardDetail);