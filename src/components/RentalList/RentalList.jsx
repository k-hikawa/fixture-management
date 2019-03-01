import React, { Component } from 'react';
import { Button, Header, Icon, Table } from 'semantic-ui-react';

import './RentalList.css';

export default class RentalList extends Component {
  render() {
    return (
      <div className="RentalList_root">
        <div className="RentalList_header">
          <h3 className="RentalList_title">返却する備品を選択してください</h3>
        </div>
        <div className="RentalList_body">
          <Table className="RentalList_table" color="pink" celled selectable textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>備品</Table.HeaderCell>
                <Table.HeaderCell>貸出人</Table.HeaderCell>
                <Table.HeaderCell>貸出開始日</Table.HeaderCell>
                <Table.HeaderCell>返却ボタン</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.rentalList.map((item, index) => {
                return (
                  this.renderTableRow(item, index)
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }

  renderTableRow(item, index) {
    return (
      <Table.Row key={index}>
        <Table.Cell width="9">
          <Header
            className="RentalList_cellHeader"
            as='h2'
            image={item.fixture.image}
            content={item.fixture.name}
          />
        </Table.Cell>
        <Table.Cell width="2">{item.user.name.lastName + item.user.name.firstName}</Table.Cell>
        <Table.Cell width="3">{item.rentalAt}</Table.Cell>
        <Table.Cell width="2">
          <Button
            primary
            animated="vertical"
            onClick={() => this.props.doReturn(item.fixture.name, item.rentalId, index)}
          >
            <Button.Content hidden>
              <Icon name="reply" />
            </Button.Content>
            <Button.Content visible>返却する</Button.Content>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}
