import { Component } from "react";
import ReactWordcloud from "react-wordcloud";
import { url } from "../config";

class Wordcloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordData: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch(`${url}/feedback`, {
        method: "GET",
      });

      let data = await response.json();
      // Obtaining frequency of words from user feedback
      let wordFreq = [];
      let allWords = {};
      for (let i = 0; i < data.length; i++) {
        if (data[i].feedback) {
          var words = data[i].feedback.split(" ");
          for (let j = 0; j < words.length; j++) {
            let word = words[j].toLowerCase();
            if (word.match(/[a-z]/i)) {
              if (!(word in allWords)) {
                allWords[word] = 1;
              } else {
                allWords[word] += 1;
              }
            }
          }
        }
      }
      // Sorting them in descending order of frequency
      for (var word in allWords) {
        wordFreq.push([word, allWords[word]]);
      }
      wordFreq = wordFreq.sort((a, b) => b[1] - a[1]);
      wordFreq = wordFreq.map(([text, value]) => ({ text, value }));
      await this.setState({
        wordData: wordFreq,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { wordData } = this.state;
    const sizes = [650, 300];
    const options = {
      fontFamily: "Arial",
      fontSizes: [20, 50],
      rotations: 2,
      rotationAngles: [-90, 0],
    };

    return (
      <div>
        <div className="chart-title">
          <strong className="title-name">
            Most Frequently Used Words in Feedbacks
          </strong>
        </div>
        <ReactWordcloud words={wordData} size={sizes} options={options} />
      </div>
    );
  }
}

export default Wordcloud;
