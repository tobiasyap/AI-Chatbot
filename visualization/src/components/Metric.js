import { Component } from "react";
import * as moment from "moment";
import { Fade } from "react-awesome-reveal";
import { url } from "../config";

class Metric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      time: "",
    };
  }

  async componentDidMount() {
    let response = await fetch(`${url}/feedback`, {
      method: "GET",
    });

    let data = await response.json();
    let times = data.map((x) => x.createdAt);
    let latest = times[0];
    for (let i = 0; i < times.length; i++) {
      if (times[i] > latest) {
        latest = times[i];
      }
    }
    latest = new Date(latest);
    this.setState({
      count: data.length,
      time: moment(latest)._i.toLocaleString(),
    });
  }

  render() {
    const { count, time } = this.state;

    return (
      <div className="row-display">
        <Fade>
          <strong className="title-name">Total Number of Queries Asked</strong>
          <b className="metric">{count}</b>
          <br />
          <br />
          <br />
          <strong className="title-name">Time of Last Asked Query</strong>
          <b className="metric">{time}</b>
        </Fade>
      </div>
    );
  }
}

export default Metric;
