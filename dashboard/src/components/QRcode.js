import React, { Component } from "react";
import QRCode from "qrcode-react";

export default class QRcode extends Component {
  render() {
    return (
      <div>
        <QRCode
          value={
            "https://api-2445582824322.production.gw.apicast.io:443/deploy/" +
            this.props.name +
            "/"
          }
        />
        ,
      </div>
    );
  }
}
