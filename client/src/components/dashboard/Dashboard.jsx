import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, setDataLogin } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import compose from "recompose/compose";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { createGroup } from "../../actions/groupActions";
import { sendMesage, getMesage } from "../../actions/messageAction";
const user = JSON.parse(localStorage.getItem("isUser"));
const styles = () => ({
  border: {
    borderTopWidth: "1",
    borderColor: "grey",
    borderStyle: "solid",
    position: "relative",
    marginLeft: "25em",
    width: "65%",
    height: "50vH"
  },
  mesage: {
    float: "left",
    marginLeft: "25em",
    width: "50%",
    display: "inline-grid"
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.setMsgHist = this.setMsgHist.bind(this);
    this.getSelection = this.getSelection.bind(this);
    this.state = {
      userGrp: "",
      items: [],
      grpName: "",
      checked: [],
      refreshChild: "",
      contSel: {},
      open: false,
      messageField: "",
      msgHist: []
    };
  }
  getSelection = data => {
    this.props.getMesage(this.props.auth.user._id, data._id, this.setMsgHist);

    this.setState({ contSel: data });
  };
  setMsgHist(arg) {
    this.setState({ msgHist: arg });
  }
  handleChange = itm => e => {
    if (!e.target.checked) {
      let cheked = this.state.checked;
      cheked = cheked.filter(chk => chk.email != itm.email);
      this.setState({ checked: cheked });
    } else {
      let cheked = this.state.checked;
      cheked.push(itm);
      this.setState({ checked: cheked });
    }
  };
  openGroupModal = () => {
    this.setState({ open: true });
  };
  closeGroupModal = () => {
    this.setState({ open: false });
  };
  sendMesage = () => {
    if (this.state.contSel.name) {
      let receiver = this.state.contSel;
      this.props.sendMesage(
        this.state.messageField,
        this.props.auth.user,
        receiver,
        receiver.members && receiver._id,
        this.emptyField
      );
    }
  };
  emptyField = () => {
    document.getElementById("messageField").value = "";
    this.setState({ messageField: "" });
    this.props.getMesage(
      this.props.auth.user._id,
      this.state.contSel._id,
      this.setMsgHist
    );
  };
  createGrup = () => {
    let asd = this.state.checked;
    asd.push(user);
    let grpName = this.state.grpName;
    this.props.createGroup(grpName, asd);
    this.setState({ open: false, refreshChild: true });
  };
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }
  componentWillReceiveProps(next) {
    console.log(this.props);
    const userGrp = next.auth.userGrp;

    const iteeem = next.auth.userAll;
    this.setState({ items: iteeem, userGrp });
  }
  componentWillMount() {
    this.props.setDataLogin();
  }
  render() {
    const items = this.state.items || [];
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
          <DialogContent>
            <DialogContentText />
            <TextField
              id="grpName"
              label="Group Name"
              type="text"
              onChange={() =>
                this.setState({
                  grpName: document.getElementById("grpName").value
                })
              }
            />
            <Grid item xs={12} style={{ margin: "2em" }}>
              {items.map(itm => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={itm.checkedA}
                      onChange={this.handleChange(itm)}
                      value="checkedA"
                    />
                  }
                  label={itm.name}
                />
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeGroupModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.createGrup} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Navbar check={this.props} />
        <Grid item xs={2} style={{ margin: "2em" }}>
          <Sidebar
            getSelection={this.getSelection}
            items={this.state.items || []}
            // props={this.props}
            // groups={this.state.userGrp || []}
            refreshList={this.state.refreshChild}
          />
        </Grid>
        <p style={{ marginLeft: "18em" }}>
          You are messaging to :{" "}
          {Object.keys(this.state.contSel).length === 0 &&
          this.state.contSel.constructor === Object ? (
            <b>No item selected</b>
          ) : (
            ""
          )}
          {this.state.contSel.members
            ? this.state.contSel.members.map(itm => `${itm.name},`)
            : this.state.contSel.name}
        </p>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classes.border}
        >
          DRID IS HERE
          {this.state.msgHist.map(itm => (
            <div style={{ float: "right" }}>
              <b>{itm.message}</b> sent by {itm.sender.name}
            </div>
          ))}
        </Grid>
        <div>
          <TextField
            className={classes.mesage}
            id="messageField"
            type="text"
            onChange={() =>
              this.setState({
                messageField: document.getElementById("messageField").value
              })
            }
          />
          <button
            style={{
              position: "absolute",
              borderRadius: "3px",
              marginRight: "10em",
              marginTop: "1em",
              letterSpacing: "0.5px",
              float: "right"
            }}
            onClick={this.sendMesage}
            className="btn btn-small   green "
          >
            send
          </button>
        </div>
        <button
          style={{
            position: "absolute",
            right: "20px",
            bottom: "55px",
            margin: "1rem",
            width: "100px",
            borderRadius: "3px",
            letterSpacing: "0.5px",
            marginTop: "1rem",

            float: "left"
          }}
          onClick={this.openGroupModal}
          className="btn btn-small   green "
        >
          + group
        </button>
      </React.Fragment>
    );
  }
}
Dashboard.propTypes = {
  getMesage: PropTypes.func,
  sendMesage: PropTypes.func,
  createGroup: PropTypes.func,
  logoutUser: PropTypes.func,
  auth: PropTypes.object.isRequired,
  setDataLogin: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
  grpName: state.grpName,
  checked: state.checked
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { logoutUser, createGroup, setDataLogin, sendMesage, getMesage }
  )
)(Dashboard);
