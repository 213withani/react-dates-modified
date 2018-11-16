import _ from 'lodash';

// General
export const WHITE = '#FFFFFF';
export const BLACK = '#000000';
export const GREY = '#808080';

// Brand
export const BLACK_CORAL = '#566166'; // coolors.co
export const CHARCOAL = '#363F44'; // coolors.co
export const FIREBRICK = '#AF2B21'; // coolors.co
export const RIVER_BED = '#475156'; // chir.ag
export const SEA_SERPENT = '#58C4D7'; // coolors.co
export const WASABI = '#86B53B';
export const TERRA_COTTA = '#EB6D64'; // coolors.co

// Shades of Gray
export const ABBEY = '#50595F'; // chir.ag
export const ALTO = '#DDDDDD'; // chir.ag
export const CAPE_COD = '#3C4448'; // chir.ag
export const IRON = '#CACED0'; // chir.ag
export const MAKO = '#414A4E'; // chir.ag
export const MINE_SHAFT = '#353434'; // chir.ag
export const NEVADA = '#687075'; // chir.ag
export const NICKEL = '#6C7478'; // coolors.co
export const ONYX = '#333A3E'; // coolors.co
export const OSLO_GRAY = '#878D90'; // chir.ag
export const PLATINUM = '#E7E9EA'; // coolors.co
export const PORCELAIN = '#EDEFF0'; // chir.ag
export const QUICK_SILVER = '#9FA4A6'; // coolors.co
export const ROLLING_STONE = '#767D81'; // chir.ag
export const SPANISH_GRAY = '#979797'; // coolors.co
export const SILVER_SAND = '#B0B4B5'; // chir.ag
export const OUTER_SPACE = '#33383C'; // chir.ag

// Themes
export const COLOR_PRIMARY = SEA_SERPENT;
export const COLOR_SUCCESS = WASABI;
export const COLOR_ERROR = TERRA_COTTA;
export const CONTAINER_BG = RIVER_BED;
export const COLOR_LABEL = QUICK_SILVER;

// Signals
export const COLOR_ACTIVE = SEA_SERPENT;
export const LINK_COLOR = SEA_SERPENT;

// Media Queries
export const XL = 1800;
export const MEDIA_FEATURE_XL = `(min-width: ${XL}px)`;
export const MEDIA_QUERY_XL = `@media screen and ${MEDIA_FEATURE_XL}`;

// Layout
export const DISPLAY_FLEX = {
  display: 'flex'
};

export const CENTER_CHILDREN_VERTICAL = _.assign({}, DISPLAY_FLEX, {
  alignItems: 'center',
});

export const CENTER_CHILD_HORIZONTAL = _.assign({}, DISPLAY_FLEX, {
  justifyContent: 'center'
});

export const SPACE_CHILDREN = {
  display: 'flex',
  justifyContent: 'space-between'
};

export const FLEX_ALIGN_CENTER = _.assign({}, DISPLAY_FLEX, {
  alignItems: 'center'
});

export const FLEX_COLUMN = {
  display: 'flex',
  flexDirection: 'column'
};

// Global Border Radius
export const BORDER_RADIUS = 5;

// Transitions
export const TRANSITION_DEFAULT = {
  transitionDuration: '.2s',
  transitionTimingFunction: 'ease-out'
};

export const TRANSITION_NOTIFICATION = {
  transitionTimingFunction: 'ease-in-out'
};

// Links
export const LINK_STYLE = _.assign({}, TRANSITION_DEFAULT, {
  color: WHITE,
  textDecoration: 'none',
  ':hover': {
    color: COLOR_ACTIVE
  },
  ':focus': {
    color: COLOR_ACTIVE
  }
});

// Allow elements to fill container height
export const FLEX_CONTAINER_HEIGHT = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  minHeight: '0px',
};

export const BODY_COLUMN = {
  flex: '1 1 auto',
  padding: '15px',
};

export const BODY_COLUMN_BORDER = {
  borderRight: `1px solid ${SPANISH_GRAY}`,
};

// Z Indexes
export const Z_INDEX_OVERLAY = 1; // Overlay (under Modal and other components)
export const Z_INDEX_PAGE = 2; // Pages that overlap the overlay
export const Z_INDEX_ELEMENT = 3; // Arrows and other special elements that belong to a component
export const Z_INDEX_TOP = 4; // Elements that are always on top i.e. User Dropdown

// Global
export const NAVBAR_HEIGHT = 96; // this needs to be referenced by multiple components
export const MENU_ITEM = NAVBAR_HEIGHT / 2;
export const NOTIFICATION_MIN_HEIGHT = 56;
export const NOTIFICATION_TOP_MARGIN = 12;
export const TIMELINE_HEIGHT = 66;
export const TIMELINE_ITEM_HEIGHT = 48;
export const AT_GLANCE_WIDTH = 258;
export const SUMMARY_HEADER_HEIGHT = 50;
export const ACCOUNT_SUMMARY_GRAPH_CONTAINER_HEIGHT = 157;
export const AT_GLANCE_LEFT_SPACE = 16;
export const SEARCH_BOX_HEIGHT = 36;
export const TOTAL_SPEND_HEIGHT = 100;
export const LIST_HEADER_HEIGHT = 60;
export const GUTTER_MARGIN = 6;
export const VERTICAL_MARGIN = 18;
export const MAPVIEW_LEFT_PANEL_USED_VERTICAL_SPACE = NAVBAR_HEIGHT
  + TIMELINE_HEIGHT
  + SEARCH_BOX_HEIGHT
  + TOTAL_SPEND_HEIGHT
  + (GUTTER_MARGIN * 3)
  + (VERTICAL_MARGIN * 2);
