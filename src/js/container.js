"use strict";

// bv_info.json
// 天翼羽魂部分可视化

export function drawChart(data) {

  const { Line } = G2Plot;

  const line = new Line('container', {
    data: data,
    padding: 'auto',
    xField: 'EP',
    yField: 'Play',
    connectNulls: false,
    point: {
      size: 3,
      style: {
        fill: 'white',
        stroke: 'purple',
        lineWidth: 2,
      },
    },
    slider: {
      start: 0.0,
      end: 0.5,
    },
  });

  line.render();
}
