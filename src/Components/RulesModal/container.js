import React from 'react';
import { RulesModalUI } from './ui';

export const RulesModal = ({ setRulesOpen, mobile }) => {
  return <RulesModalUI mobile={mobile} setRulesOpen={setRulesOpen} />;
};
