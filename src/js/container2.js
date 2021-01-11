// 千葉幽羽部分可视化
"use strict";

// 纵坐标分割线设置
let div_num = 5;
// 播放数
let max_play = 200000;
let interval_play = max_play / div_num;
// 弹幕数
let max_danmaku = 6000;
let interval_danmaku = max_danmaku / div_num;
// 评论数
let max_comment = 1000;
let interval_comment = max_comment / div_num;

let myChart = echarts.init(document.getElementById('container2'));
myChart.showLoading();

export function drawChart2(data) {
  myChart.hideLoading();

  let option = {
    title: { // 标题组件
      text: "【乃木坂工事中】千葉幽羽部分数据",
      subtext: "2018 年底 ~ 现在",
      left: 'center',
    },
    tooltip: { // 提示框
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: { // 工具栏
      right: '11%',
      feature: {
        dataView: {
          readOnly: true,
        },
        magicType: {
          type: ['line', 'bar'],
        },
        saveAsImage: {},
        restore: {},
      },
    },
    grid: { // 直角坐标系
      right: '10%',
      // containLabel: true,
    },
    legend: { // 图例
      right: '20%',
      data: ["播放次数", "弹幕数量", "评论数量"],
    },
    dataset: { // 数据集
      source: data,
    },
    calculable: true,
    xAxis: { // X 轴
      // name: "期数",
      type: 'category',
      axisTick: {
        alignWithLabel: true, // 刻度线与标签对齐
      },
      axisPointer: {
        type: 'shadow',
      },
    },
    yAxis: [ // Y 轴
      {
        name: "播放数",
        type: 'value',
        min: 0,
        max: max_play,
        interval: interval_play,
        position: 'left',
        axisLine: {
          show: true, // 显示轴线
        },
        axisLabel: {
          formatter: function (value) {
            value = +value;
            return isFinite(value) ? echarts.format.addCommas(+value / 1000) + 'K' : '';
          },
        },
      },
      {
        name: "弹幕数",
        type: 'value',
        min: 0,
        max: max_danmaku,
        interval: interval_danmaku,
        position: 'right',
        axisLine: {
          show: true,
        },
      },
      {
        name: "评论数",
        type: 'value',
        min: 0,
        max: max_comment,
        interval: interval_comment,
        position: 'right',
        offset: 70,
        axisLine: {
          show: true,
        },
      },
    ],
    dataZoom: [ // 缩放
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 25,
      },
      {
        type: 'inside',
        show: true,
        start: 0,
        end: 25,
      }
    ],
    series: [
      {
        name: '播放次数',
        type: 'line',
        yAxisIndex: 0,
        // encode: {
        //   x: "EP",
        //   y: "Play",
        // },
        data: data.map(function (item) {
          return item["Play"];
        }),
        itemStyle: {  // 折线拐点样式
          color: '#BA55D3',
        },
        lineStyle: { // 折线样式
          color: { // 渐变色
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0, color: '#8700b3', // 顶部颜色
              },
              {
                offset: 0.5, color: '#BA55D3',
              },
              {
                offset: 1, color: '#fbccff', // 底部颜色
              }
            ],
            global: false,
          },
        },
        markLine: {
          data: [
            { // 中位数标线
              type: 'median',
              name: "中位数",
              label: {
                position: 'start',
                formatter: "中位数",
              },
              lineStyle: {
                color: '#00B2EE',
              },
            },
            [ // 最大值标线
              { // 起点
                symbol: 'circle',
                x: '10%',
                yAxis: 'max',
                label: {
                  position: 'start',
                  formatter: "最多播放",
                },
              },
              { // 终点
                type: 'max',
                name: "最高点",
                symbol: 'none',
                lineStyle: {
                  color: '#00B2EE',
                },
              },
            ],
          ],
        },
      },
      {
        name: '弹幕数量',
        type: 'bar',
        yAxisIndex: 1,
        encode: {
          x: "EP",
          y: "Danmaku",
        },
        itemStyle: {
          color: '#66CD00',
        },
        markPoint: { // 最大值标点
          symbolSize: 35,
          data: [
            {
              type: 'max',
              name: '最多弹幕数',
            },
          ],
        },
      },
      {
        name: '评论数量',
        type: 'bar',
        yAxisIndex: 2,
        encode: {
          x: "EP",
          y: "Comment",
        },
        itemStyle: {
          color: '#EEC900',
        },
        markPoint: { // 最大值标点
          symbolSize: 35,
          data: [
            {
              type: 'max',
              name: '最多评论数',
            },
          ],
        },
      },
    ],
  };

  myChart.setOption(option);
}

