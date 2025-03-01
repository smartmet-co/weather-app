import React from 'react';
import { VictoryLine, VictoryBar, VictoryGroup } from 'victory-native';
import { CustomTheme } from '@assets/colors';
import { useTheme } from '@react-navigation/native';
import chartTheme from '@assets/chartTheme';
import { getPrecipitationLevel } from '@utils/helpers';
import { ChartDataProps } from './types';
import { secondaryYDomainForWeatherChart } from '@utils/chart';
import { Config } from '@config';

const WeatherChart: React.FC<ChartDataProps> = ({
  chartValues,
  chartDomain,
  chartWidth,
  units,
}) => {
  const defaultUnits = Config.get('settings').units;
  const precipitationUnit =
    units?.precipitation.unitAbb ?? defaultUnits.precipitation;

  const { colors } = useTheme() as CustomTheme;
  const { temperature, feelsLike, dewPoint, precipitation1h } = chartValues;

  const secondaryChartDomain = secondaryYDomainForWeatherChart(
    precipitation1h.map((step) => step.y),
    chartDomain
  );

  // Victory Native supports only one y domain, so we need to normalize precipitation data

  const scaleFactor = chartDomain.y ? chartDomain.y[1] - chartDomain.y[0] : 1;
  const precipitationDivider = secondaryChartDomain.y?.[1] ?? 1;

  return (
    <VictoryGroup theme={chartTheme} width={chartWidth}>
      {precipitation1h && precipitation1h.length > 0 && (
        <VictoryBar
          data={precipitation1h}
          domain={chartDomain}
          alignment="middle"
          barWidth={6}
          style={{
            data: {
              fill: ({ datum }) =>
                colors.rain[getPrecipitationLevel(datum.y, precipitationUnit)],
            },
          }}
          y0={() =>
            Math.min(
              (chartDomain.y && chartDomain.y[0]) ?? 0,
              (chartDomain.y && chartDomain.y[1]) ?? 0
            )
          }
          y={(datum) =>
            Math.min(
              (chartDomain.y && chartDomain.y[0]) ?? 0,
              (chartDomain.y && chartDomain.y[1]) ?? 0
            ) +
            (datum.y / precipitationDivider) * scaleFactor
          }
        />
      )}
      {temperature && temperature.length > 0 && (
        <VictoryLine
          data={temperature}
          domain={chartDomain}
          style={{ data: { stroke: colors.chartPrimaryLine } }}
          interpolation="basis"
        />
      )}
      {feelsLike && feelsLike.length > 0 && (
        <VictoryLine
          data={feelsLike}
          domain={chartDomain}
          style={{
            data: { stroke: colors.chartSecondaryLine, strokeDasharray: '4' },
          }}
          interpolation="basis"
        />
      )}
      {dewPoint && dewPoint.length > 0 && (
        <VictoryLine
          data={dewPoint}
          domain={chartDomain}
          style={{
            data: { stroke: colors.chartPrimaryLine, strokeDasharray: '2' },
          }}
          interpolation="basis"
        />
      )}
    </VictoryGroup>
  );
};
export default WeatherChart;
