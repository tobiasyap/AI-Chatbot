import { Component } from "react";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { url } from "../config";

class Barchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barData: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch(`${url}/feedback`, {
        method: "GET",
      });

      let data = await response.json();
      let wordFreq = [];
      let allWords = {};
      for (let i = 0; i < data.length; i++) {
        var words = data[i].user_query.split(" ");
        for (let j = 0; j < words.length; j++) {
          let word = words[j].toLowerCase();
          if (!(word in allWords)) {
            allWords[word] = 1;
          } else {
            allWords[word] += 1;
          }
        }
      }
      for (var word in allWords) {
        wordFreq.push([word, allWords[word]]);
      }
      wordFreq = wordFreq.sort((a, b) => b[1] - a[1]);
      wordFreq = wordFreq.map(([word, count]) => ({ word, count }));
      await this.setState({
        barData: wordFreq.slice(0, 10),
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { barData } = this.state;

    return (
      <div>
        <div className="chart-title">
          <strong className="title-name">
            Most Frequently Used Words in Queries
          </strong>
        </div>
        <BarChart
          data={barData}
          height={300}
          width={650}
          isAnimationActive={true}
        >
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ff9558" />
        </BarChart>
      </div>
    );
  }
}

export default Barchart;