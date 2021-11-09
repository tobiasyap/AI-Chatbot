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
    try {
      let response = await fetch(`${url}/feedback`, {
        method: "GET",
      });
  
      let data = await response.json();
      // Obtaining latest time that feedback is created
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
        time: moment(latest)._i.toLocaleString(), // Convert to Singapore Timezone
      });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { count, time } = this.state;

    return (
      <div className="row-display">
        <Fade>
          <strong className="title-name">Total Number of Queries Asked</strong>
          <>
            {count ? (
              <b className="metric">{count}</b>
            ) : (
              <div className="chart-title">
                <br /> There is no data yet!{" "}
              </div>
            )}
          </>
          <br/>
          <div className="header">
            <strong className="title-name">Time of Last Asked Query</strong>
            {time ? (
              <b className="metric">{time}</b>
            ) : (
              <div className="chart-title">
                <br /> There is no data yet!{" "}
              </div>
            )}
          </div>
        </Fade>
      </div>
    );
  }
}

export default Metric;
