import { PieChart, Pie, Cell, Sector } from "recharts";
import { Component } from "react";
import { url } from "../config";

class Piechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: [],
      activeIndex: 0,
    };
  }

  async componentDidMount() {
    let response = await fetch(`${url}/feedback`, {
      method: "GET",
    });

    let data = await response.json();
    // Obtaining number of "Yes" and "No"
    let pieData = {};
    for (let i = 0; i < data.length; i++) {
      const bool = data[i].boolean;
      if (!(bool in pieData)) {
        pieData[bool] = 1;
      } else {
        pieData[bool] += 1;
      }
    }
    // To convert into the right data format for plotting
    var pie = [];
    for (var p in pieData) {
      pie.push([p, pieData[p]]);
    }
    pie = pie.map(([bool, count]) => ({ bool, count }));
    this.setState({
      pieData: pie,
    });
  }

  render() {
    const { pieData } = this.state;
    const COLORS = ["#20ada2", "#fa7474"]; // Selection of colors on piechart, can be changed

    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
      } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? "start" : "end";

      return (
        <g>
          <text
            x={cx}
            y={cy}
            dy={8}
            textAnchor="middle"
            fill={fill}
            fontSize={20}
          >
            {payload.bool}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >{`${value}`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`(${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };

    const onPieEnter = (_, index) => {
      this.setState({
        activeIndex: index,
      });
    };

    return (
      <div>
        <div className="chart-title">
          <strong className="title-name">Questions Chatbot Answered</strong>
        </div>
        <PieChart width={650} height={300}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            innerRadius={65}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            isAnimationActive={true}
            animationDuration={200}
            onMouseEnter={onPieEnter}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}

export default Piechart;
