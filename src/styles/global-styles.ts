import { hexToRGBA } from '@/lib/hex-to-rgba';
import { ApexOptions } from 'apexcharts';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Tooltip */
  .apexcharts-tooltip,
  .apexcharts-xaxistooltip {
    border: 0 !important;
    box-shadow: '' !important;
    color: ' !important;
    border-radius: 8px !important;
    background-color: white !important;
  }
  .apexcharts-tooltip-title {
    border: 0 !important;
    font-weight: 700;
    background-color: grey !important;
    color: green;
  }
  .apexcharts-xaxistooltip-bottom {
    &:before {
      border-bottom-color: transparent !important;
    }
    &:after {
      border-bottom-color: white !important;
    }
  }

  /* Legend */
  .apexcharts-legend {
    padding: 0 !important;
  }
  .apexcharts-legend-series {
    align-items: center;
    display: flex !important;
  }
  .apexcharts-legend-marker {
    margin-top: -2px !important;
    margin-right: 8px !important;
  }
  .apexcharts-legend-text {
    line-height: 18px;
    text-transform: capitalize;
  }
`;

const BaseOptionChart = (): ApexOptions => {

  const LABEL_TOTAL = {
    show: true,
    label: 'Total',
    color: 'black'
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: 'black'
  };

  return {
    // Colors
    colors: [
      '#8244B2',
      '#468EB8',
      '#106190',
      '#E3A811',
      '#166448',
      '#073855',
      '#5ACA9A'
    ],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: 'grey'
      // fontFamily: theme.typography.fontFamily,
    },

    // States
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88
        }
      }
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100]
      }
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round'
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: hexToRGBA('#000000', 0.1)
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false }
    },

    // Markers
    markers: {
      size: 0,
      strokeColors: 'white'
    },

    // Tooltip
    tooltip: {
      x: {
        show: false
      }
    },

    // Legend
    legend: {
      show: true,
      fontSize: '13px',
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        radius: 12
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: 'grey'
      }
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: '28%',
        borderRadius: 4
      },
      // Pie + Donut
      pie: {
        donut: {
          labels: {
            // show: true,
            // value: LABEL_VALUE,
            // total: LABEL_TOTAL
          }
        }
      },
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: '100%',
          background: 'grey'
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL
        }
      },
      // Radar
      radar: {
        polygons: {
          fill: { colors: ['transparent'] },
          strokeColors: 'grey',
          connectorColors: 'grey'
        }
      },
      // polarArea
      polarArea: {
        rings: {
          strokeColor: 'grey'
        },
        spokes: {
          connectorColors: 'grey'
        }
      }
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: 600,
        options: {
          plotOptions: { bar: { columnWidth: '40%' } }
        }
      },
      {
        // md
        breakpoint: 900,
        options: {
          plotOptions: { bar: { columnWidth: '32%' } }
        }
      }
    ]
  };
};

export default BaseOptionChart;
