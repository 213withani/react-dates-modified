/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import moment from 'moment';
import omit from 'lodash/omit';
import { withStyles, withStylesPropTypes, css } from 'react-with-styles';

import isSameDay from '../src/utils/isSameDay';
import DayPickerRangeController from '../src/components/DayPickerRangeController';

import ScrollableOrientationShape from '../src/shapes/ScrollableOrientationShape';

import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION } from '../src/constants';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
import { WHITE, ALTO, ABBEY, CHARCOAL, SEA_SERPENT } from '../src/styles';

const propTypes = forbidExtraProps({
  // example props for the demo
  autoFocusEndDate: PropTypes.bool,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  showInputs: PropTypes.bool,

  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  verticalHeight: PropTypes.number,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  renderMonthElement: PropTypes.func,
  renderMonthText: PropTypes.func,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,

  isRTL: PropTypes.bool,
});

const defaultProps = {
  // example props for the demo
  autoFocusEndDate: false,
  initialStartDate: moment(),
  initialEndDate: moment(),
  startDateOffset: undefined,
  endDateOffset: undefined,
  showInputs: false,

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  minimumNights: 1,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,
  enableOutsideDays: false,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  verticalHeight: undefined,
  withPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  onOutsideClick() {},
  keepOpenOnDateSelect: false,
  renderCalendarInfo: null,
  isRTL: false,
  renderMonthText: null,
  renderMonthElement: null,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  monthFormat: 'MMMM YYYY',
};

class DayPickerRangeControllerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);

    this.renderDatePresets = this.renderDatePresets.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  renderDatePresets() {
    const { presets, styles } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <div {...css(styles.PresetDateRangePicker_panel)}>
        {presets.map(({ text, start, end }) => {
          const isSelected = isSameDay(start, startDate) && isSameDay(end, endDate);
          return (
            <span
              key={text}
              {...css(
                styles.PresetDateRangePicker_button,
                isSelected && styles.PresetDateRangePicker_button__selected,
              )}
              type="button"
              onClick={() => this.onDatesChange({ startDate: start, endDate: end })}
            >
              {text}
            </span>
          );
        })}
      </div>
    );
  }

  render() {
    const { showInputs, styles } = this.props;
    const { focusedInput, startDate, endDate } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'showInputs',
    ]);

    const startDateString = startDate && startDate.format('MM/DD/YYYY');
    const endDateString = endDate && endDate.format('MM/DD/YYYY');

    console.log('============Date========================');
    console.log(startDate);
    console.log(endDate);
    console.log('====================================');

    return (
      <div style={{ height: '100%', width: '80%'}}>
      
      <div {...css(styles.presetContainerStyle)}>{this.renderDatePresets()}</div>

        {showInputs &&
          <div {...css(styles.inputBackgroundStyles)}>
            <input {...css(styles.inputStyle)} type="text" name="start date" value={startDateString} readOnly />
            {' - '}
            <input {...css(styles.inputStyle)} type="text" name="end date" value={endDateString} readOnly />
          </div>
        }
        <div {...css(styles.yearRangeStyle)}>
        {moment(startDate).format('YYYY')} - {moment(endDate).format('YYYY')}
        </div>

        <DayPickerRangeController
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    );
  }
}

DayPickerRangeControllerWrapper.propTypes = propTypes;
DayPickerRangeControllerWrapper.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color } }) => ({
  inputStyle : {
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 300,
  },
  inputBackgroundStyles: {
    marginBottom: 16,
    backgroundColor:`${ALTO}`,
    height: 60,
    width: '100%',
    padding: 10,
  },
  yearRangeStyle : {
    height: 40,
    paddingLeft: 10,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: `${WHITE}`,
    color: `${SEA_SERPENT}`,
    fontWeight: 700, 
    margin: 0,
  },
  presetContainerStyle: {
    backgroundColor: `${WHITE}`, 
    height: 60,
  },

  PresetDateRangePicker_panel: {
    padding: '20px 22px 0px 20px',
    height: 60,
    margin: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  PresetDateRangePicker_button: {
    position: 'relative',
    height: '100%',
    textAlign: 'center',
    background: 'none',
    color: `${CHARCOAL}`,
    padding: '2px 18px 2px 18px',
    marginTop: 8,
    font: 'inherit',
    fontSize: 16,
    lineHeight: 'normal',
    overflow: 'visible',
    boxSizing: 'border-box',
    cursor: 'pointer',
    ':active': {
      outline: 0,
    },
  },

  PresetDateRangePicker_button__selected: {
    color: `${SEA_SERPENT}`,
    background: `${CHARCOAL}`,
    borderRadius: 25
  },
}))(DayPickerRangeControllerWrapper);
