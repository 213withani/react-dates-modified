diff --git a/examples/DayPickerRangeControllerWrapper.jsx b/examples/DayPickerRangeControllerWrapper.jsx
index 5e6d786..623c158 100644
--- a/examples/DayPickerRangeControllerWrapper.jsx
+++ b/examples/DayPickerRangeControllerWrapper.jsx
@@ -5,13 +5,16 @@ import momentPropTypes from 'react-moment-proptypes';
 import { forbidExtraProps } from 'airbnb-prop-types';
 import moment from 'moment';
 import omit from 'lodash/omit';
+import { withStyles, withStylesPropTypes, css } from 'react-with-styles';
 
+import isSameDay from '../src/utils/isSameDay';
 import DayPickerRangeController from '../src/components/DayPickerRangeController';
 
 import ScrollableOrientationShape from '../src/shapes/ScrollableOrientationShape';
 
 import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION } from '../src/constants';
 import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
+import { WHITE, ALTO, ABBEY, CHARCOAL, SEA_SERPENT } from '../src/styles';
 
 const propTypes = forbidExtraProps({
   // example props for the demo
@@ -57,8 +60,8 @@ const propTypes = forbidExtraProps({
 const defaultProps = {
   // example props for the demo
   autoFocusEndDate: false,
-  initialStartDate: null,
-  initialEndDate: null,
+  initialStartDate: moment(),
+  initialEndDate: moment(),
   startDateOffset: undefined,
   endDateOffset: undefined,
   showInputs: false,
@@ -107,6 +110,8 @@ class DayPickerRangeControllerWrapper extends React.Component {
 
     this.onDatesChange = this.onDatesChange.bind(this);
     this.onFocusChange = this.onFocusChange.bind(this);
+
+    this.renderDatePresets = this.renderDatePresets.bind(this);
   }
 
   onDatesChange({ startDate, endDate }) {
@@ -120,8 +125,34 @@ class DayPickerRangeControllerWrapper extends React.Component {
     });
   }
 
+  renderDatePresets() {
+    const { presets, styles } = this.props;
+    const { startDate, endDate } = this.state;
+
+    return (
+      <div {...css(styles.PresetDateRangePicker_panel)}>
+        {presets.map(({ text, start, end }) => {
+          const isSelected = isSameDay(start, startDate) && isSameDay(end, endDate);
+          return (
+            <span
+              key={text}
+              {...css(
+                styles.PresetDateRangePicker_button,
+                isSelected && styles.PresetDateRangePicker_button__selected,
+              )}
+              type="button"
+              onClick={() => this.onDatesChange({ startDate: start, endDate: end })}
+            >
+              {text}
+            </span>
+          );
+        })}
+      </div>
+    );
+  }
+
   render() {
-    const { showInputs } = this.props;
+    const { showInputs, styles } = this.props;
     const { focusedInput, startDate, endDate } = this.state;
 
     const props = omit(this.props, [
@@ -132,17 +163,29 @@ class DayPickerRangeControllerWrapper extends React.Component {
       'showInputs',
     ]);
 
-    const startDateString = startDate && startDate.format('YYYY-MM-DD');
-    const endDateString = endDate && endDate.format('YYYY-MM-DD');
+    const startDateString = startDate && startDate.format('MM/DD/YYYY');
+    const endDateString = endDate && endDate.format('MM/DD/YYYY');
+
+    console.log('============Date========================');
+    console.log(startDate);
+    console.log(endDate);
+    console.log('====================================');
 
     return (
-      <div style={{ height: '100%' }}>
+      <div style={{ height: '100%', width: '80%'}}>
+      
+      <div {...css(styles.presetContainerStyle)}>{this.renderDatePresets()}</div>
+
         {showInputs &&
-          <div style={{ marginBottom: 16 }}>
-            <input type="text" name="start date" value={startDateString} readOnly />
-            <input type="text" name="end date" value={endDateString} readOnly />
+          <div {...css(styles.inputBackgroundStyles)}>
+            <input {...css(styles.inputStyle)} type="text" name="start date" value={startDateString} readOnly />
+            {' - '}
+            <input {...css(styles.inputStyle)} type="text" name="end date" value={endDateString} readOnly />
           </div>
         }
+        <div {...css(styles.yearRangeStyle)}>
+        {moment(startDate).format('YYYY')} - {moment(endDate).format('YYYY')}
+        </div>
 
         <DayPickerRangeController
           {...props}
@@ -160,4 +203,65 @@ class DayPickerRangeControllerWrapper extends React.Component {
 DayPickerRangeControllerWrapper.propTypes = propTypes;
 DayPickerRangeControllerWrapper.defaultProps = defaultProps;
 
-export default DayPickerRangeControllerWrapper;
+export default withStyles(({ reactDates: { color } }) => ({
+  inputStyle : {
+    height: 40,
+    paddingLeft: 10,
+    fontSize: 16,
+    fontWeight: 300,
+  },
+  inputBackgroundStyles: {
+    marginBottom: 16,
+    backgroundColor:`${ALTO}`,
+    height: 60,
+    width: '100%',
+    padding: 10,
+  },
+  yearRangeStyle : {
+    height: 40,
+    paddingLeft: 10,
+    fontSize: 20,
+    textAlign: 'center',
+    backgroundColor: `${WHITE}`,
+    color: `${SEA_SERPENT}`,
+    fontWeight: 700, 
+    margin: 0,
+  },
+  presetContainerStyle: {
+    backgroundColor: `${WHITE}`, 
+    height: 60,
+  },
+
+  PresetDateRangePicker_panel: {
+    padding: '20px 22px 0px 20px',
+    height: 60,
+    margin: 0,
+    overflow: 'hidden',
+    whiteSpace: 'nowrap',
+  },
+
+  PresetDateRangePicker_button: {
+    position: 'relative',
+    height: '100%',
+    textAlign: 'center',
+    background: 'none',
+    color: `${CHARCOAL}`,
+    padding: '2px 18px 2px 18px',
+    marginTop: 8,
+    font: 'inherit',
+    fontSize: 16,
+    lineHeight: 'normal',
+    overflow: 'visible',
+    boxSizing: 'border-box',
+    cursor: 'pointer',
+    ':active': {
+      outline: 0,
+    },
+  },
+
+  PresetDateRangePicker_button__selected: {
+    color: `${SEA_SERPENT}`,
+    background: `${CHARCOAL}`,
+    borderRadius: 25
+  },
+}))(DayPickerRangeControllerWrapper);
diff --git a/src/components/DayPickerRangeController.jsx b/src/components/DayPickerRangeController.jsx
index e0cdbc1..d801ad0 100644
--- a/src/components/DayPickerRangeController.jsx
+++ b/src/components/DayPickerRangeController.jsx
@@ -104,8 +104,8 @@ const propTypes = forbidExtraProps({
 });
 
 const defaultProps = {
-  startDate: undefined, // TODO: use null
-  endDate: undefined, // TODO: use null
+  startDate: moment(), // TODO: use null
+  endDate: moment(), // TODO: use null
   onDatesChange() {},
   startDateOffset: undefined,
   endDateOffset: undefined,
@@ -498,6 +498,8 @@ export default class DayPickerRangeController extends React.PureComponent {
       if (!isEndDateDisabled || !isStartDateAfterEndDate) {
         startDate = day;
         if (isStartDateAfterEndDate) {
+          console.log('===============FOUND IT=====================');
+          console.log('====================================');
           endDate = null;
         }
       }
@@ -1082,7 +1084,7 @@ export default class DayPickerRangeController extends React.PureComponent {
     } = this.props;
 
     const { currentMonth, phrases, visibleDays } = this.state;
-
+    
     return (
       <DayPicker
         orientation={orientation}
diff --git a/stories/DayPickerRangeController.js b/stories/DayPickerRangeController.js
index 5cff95d..8aa268e 100644
--- a/stories/DayPickerRangeController.js
+++ b/stories/DayPickerRangeController.js
@@ -7,11 +7,14 @@ import { withInfo } from '@storybook/addon-info';
 import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';
 
 import isSameDay from '../src/utils/isSameDay';
-import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
+import isInclusivelyAfterDay  from '../src/utils/isInclusivelyAfterDay';
 
 import { VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE } from '../src/constants';
 
 import DayPickerRangeControllerWrapper from '../examples/DayPickerRangeControllerWrapper';
+import CustomizableCalendarDay from '../src/components/CustomizableCalendarDay';
+
+import { SEA_SERPENT, ABBEY, CHARCOAL } from '../src/styles';
 
 const dayPickerRangeControllerInfo = `The ${monospace('DayPickerRangeController')} component is a
   fully controlled version of the ${monospace('DayPicker')} that has built-in rules for selecting a
@@ -30,6 +33,59 @@ const dayPickerRangeControllerInfo = `The ${monospace('DayPickerRangeController'
   ${monospace('DateRangePicker')} functionality and calendar presentation, but would like to
   implement your own inputs.`;
 
+const today = moment();
+const week = moment().subtract(1, 'week');
+const presets = [{
+  text: 'Today',
+  start: today,
+  end: today,
+},
+{
+  text: 'Last Week',
+  start: week,
+  end: week,
+},
+{
+  text: 'This month',
+  start: today,
+  end: moment().add(1, 'month'),
+},
+{
+  text: 'This Quarter',
+  start: today,
+  end: moment().add(3, 'month'),
+}];
+
+  const selectedStyles = {
+    background: `${CHARCOAL}`,
+    color: `${SEA_SERPENT}`,
+  };
+  
+  const hoveredStyles = {
+    background: `${ABBEY}`,
+    color: `${SEA_SERPENT}`,
+  };
+  
+  const blockedStyles = {
+    background: '#fff',
+    color: '#dce0e0',
+  };
+  
+  const customDayStyles = {
+    selectedStartStyles: selectedStyles,
+    selectedEndStyles: selectedStyles,
+    hoveredSpanStyles: hoveredStyles,
+    afterHoveredStartStyles: hoveredStyles,
+    blockedMinNightsStyles: blockedStyles,
+    blockedCalendarStyles: blockedStyles,
+    blockedOutOfRangeStyles: blockedStyles,
+  
+    selectedSpanStyles: {
+      background: `${ABBEY}`,
+      color: `${SEA_SERPENT}`,
+    },
+  };
+
 const TestPrevIcon = () => (
   <span
     style={{
@@ -196,10 +252,11 @@ storiesOf('DayPickerRangeController', module)
       onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
       onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
       orientation={VERTICAL_ORIENTATION}
+      
     />
   )))
   .add('vertical scrollable', withInfo()(() => (
-    <div style={{ height: 500 }}>
+    <div style={{ height: 500, width:'50%' }}>
       <DayPickerRangeControllerWrapper
         onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
         onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
@@ -207,8 +264,16 @@ storiesOf('DayPickerRangeController', module)
         orientation={VERTICAL_SCROLLABLE}
         numberOfMonths={6}
         verticalHeight={800}
+        monthFormat="MMMM"
+        noNavButtons
+        hideKeyboardShortcutsPanel
+        renderCalendarDay={props => <CustomizableCalendarDay {...props} {...customDayStyles} />}
+        calendarInfoPosition="top"
+        weekDayFormat='dd'
+        showInputs
+        presets={presets}
       />
-    </div>
+       </div>
   )))
   .add('vertical scrollable with custom month nav', withInfo()(() => (
     <div style={{ height: 500 }}>
