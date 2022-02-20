import React from 'react';
import { RulesModalUI } from './ui';

export const RulesModal = ({ setRulesOpen, notMobile }) => {
  return <RulesModalUI notMobile={notMobile} setRulesOpen={setRulesOpen} />;
};
