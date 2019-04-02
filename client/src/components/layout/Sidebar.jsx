import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";

import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";

class Sidebar extends Component {
  state = {
    items: [],
    textProperty: "",
    valueProperty: "",
    selectedItem: "",
    onItemSelect: "",
    searchtext: "",
    refreshList: "",
    userGrp: []
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onItemSelect = item => {
    this.setState({ selectedItem: item });

    this.props.getSelection(item);
  };
  componentWillReceiveProps(props) {
    const userGrp =
      props.group.userGrp.length == 0
        ? props.auth.userGrp
        : props.group.userGrp;

    this.setState({ userGrp: userGrp });
  }
  componentDidMount() {
    this.setState({
      userGrp: this.props.groups
    });
  }
  refreshList = () => this.setState({ refreshList: !this.state.refreshList });

  render() {
    let filterItem = this.props.items.filter(
      item =>
        item.name.toLowerCase().indexOf(this.state.searchtext.toLowerCase()) !==
        -1
    );
    return (
      <div style={{ maxHeight: "1em" }}>
        <input
          value={this.state.searchtext}
          type="text"
          id="searchtext"
          placeholder="search"
          onChange={this.onChange}
        />{" "}
        <List style={{ backgroundColor: "grey" }}>
          {filterItem.map(item => (
            <ListItem
              button
              style={{ backgroundColor: "lightgrey" }}
              onClick={() => this.onItemSelect(item)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <div style={{ margin: "1em" }}>GROUPS</div>
        <List style={{ backgroundColor: "grey" }}>
          {this.state.userGrp.map(item => (
            <ListItem
              button
              style={{ backgroundColor: "lightgrey" }}
              onClick={() => this.onItemSelect(item)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  group: PropTypes.object
};
const mapStateToProps = state => ({
  auth: state.auth,
  group: state.group
});
export default connect(
  mapStateToProps,
  {}
)(Sidebar);
