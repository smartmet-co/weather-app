import Icon from '@components/common/Icon';
import { WarningType } from '@store/warnings/types';
import React from 'react';

type WarningSymbolProps = {
  type: WarningType;
  size?: number;
};
const WarningSymbol: React.FC<WarningSymbolProps> = ({
  type,
  size,
}) => {
  // map event-string to warning icon string
  const typeMap: { [key in WarningType]: string } = {
    'Severe weather warning': 'severe-weather-warning',
    'Wind and waves warning': 'wind-and-waves-warning',
    'High tide warning': 'high-tide-warning',
    'Disturbance advisory': 'disturbance-advisory',
    'Disturbance watch': 'disturbance-watch',
    'Disturbance warning': 'disturbance-warning',
    'Tropical depression advisory': 'tropical-depression-advisory',
    'Tropical depression watch': 'tropical-depression-watch',
    'Tropical depression warning': 'tropical-depression-warning',
    'Tropical storm advisory': 'tropical-storm-advisory',
    'Tropical storm watch': 'tropical-storm-watch',
    'Tropical storm warning': 'tropical-storm-warning',
    'Hurricane advisory': 'hurricane-advisory',
    'Hurricane watch': 'hurricane-watch',
    'Hurricane warning': 'hurricane-warning',
    'Post-tropical cyclone advisory': 'post-tropical-cyclone-advisory',
    'Post-tropical cyclone watch': 'post-tropical-cyclone-watch',
    'Post-tropical cyclone warning': 'post-tropical-cyclone-warning',
    'Landslide warning': 'landslide-warning',
    'Forest fire warning': 'forest-fire-warning',
    'Low temperature advisory': 'low-temperature-advisory',
    'Low temperature watch': 'low-temperature-watch',
    'Low temperature warning': 'low-temperature-warning',
    'High temperature advisory': 'high-temperature-advisory',
    'High temperature watch': 'high-temperature-watch',
    'High temperature warning': 'high-temperature-warning',
    'Rainfall advisory': 'rainfall-advisory',
    'Rainfall watch': 'rainfall-watch',
    'Rainfall warning': 'rainfall-warning',
    'Flash flood advisory': 'flash-flood-advisory',
    'Flash flood watch': 'flash-flood-watch',
    'Flash flood warning': 'flash-flood-warning',
    'Low river level advisory': 'low-river-level-advisory',
    'Low river level watch': 'low-river-level-watch',
    'Low river level warning': 'low-river-level-warning',
    'High river level advisory': 'high-river-level-advisory',
    'High river level watch': 'high-river-level-watch',
    'High river level warning': 'high-river-level-warning',
    'Flood routing advisory': 'flood-routing-advisory',
    'Flood routing watch': 'flood-routing-watch',
    'Flood routing warning': 'flood-routing-warning',
    'Flash flood advisory due reservoir water discharge': 'flash-flood-advisory-due-reservoir-water-discharge',
    'Flash flood watch due reservoir water discharge': 'flash-flood-watch-due-reservoir-water-discharge',
    'Flash flood warning due reservoir water discharge': 'flash-flood-warning-due-reservoir-water-discharge',
    'River flooding warning': 'river-flooding-warning'
  };

  let name = 'warnings';
  const typeName = typeMap[type];
  if (typeName) {
    // add type string
    name += `-${typeMap[type]}`;
  }

  return <Icon name={name} width={size ?? 24} height={size ?? 24} />;
};

export default WarningSymbol;
