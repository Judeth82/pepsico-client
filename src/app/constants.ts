import { MatTooltipDefaultOptions } from "@angular/material/tooltip";

export const InputDelayMS = 3000;

export const defaultConstants = {
  nbsp: String.fromCharCode(160),
  newLine: '\n',
  htmlNewLine: '<br/>',
}

export const keyCodes = {
  enter: 13,
  escape: 27,
};

export const maskSeparator = {
  int: '9999999999',
  separator: 'separator.0',
  separator6: 'separator.6',
  separator3: 'separator.3',
  separator2: 'separator.2',
  thousandSeparator: '',
};

export const maskMaxIntDigitsHelper = {
  max12: '100000000000',
  max11: '10000000000',
  max10: '1000000000',
  max9: '100000000',
  max8: '10000000',
  max7: '1000000',
  max6: '100000',
  max5: '10000',
  max4: '1000',
  max3: '100',
  max2: '10',
};

export const formsTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 400,
  hideDelay: 100,
  touchendHideDelay: 1000,
  position: 'above',
};
