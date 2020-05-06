import React, { Component } from 'react';
import styled from 'styled-components';
import Review from './Review.jsx';
import Title from './Title.jsx';
import Financing from './Financing.jsx';
import AvailableColors from './AvailableColors.jsx';
import ColorList from './ColorList.jsx';
import Size from './Size.jsx'

const RenderDiv = styled.div`
  min-height: 300px;
  flex-basis: 400px;
  flex-grow: 1;
  font-family: AdineuePRO,Helvetica;
  padding: 30px 40px;
  flex-direction: column;
  flex-wrap: wrap;
`;

class OrderInfo extends Component {
  constructor(props){
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color){
    this.props.handleColorChange(color);
  }

  render(){
    return (
      <RenderDiv>
        <Review product={this.props.product}/>
        <Title product={this.props.product} color={this.props.color}/>
        <Financing product={this.props.product} color={this.props.color}/>
        <Size product={this.props.product} color={this.props.color}/>
        <AvailableColors product={this.props.product} color={this.props.color}/>
        <ColorList product={this.props.product} color={this.props.color} handleColorChange={this.handleColorChange}/>
      </RenderDiv>
    );
  }
}

export default OrderInfo;