export default function(textWidth) {
  let navItemStyle = {
    cursor: 'pointer'
  };

  // once text width is measured, lock navItem width in to prevent navItems from moving due to width changes of neighbor navItems
  if (textWidth) {
    Object.assign(
      navItemStyle,
      {
        paddingRight: 0,
        width: textWidth + 24 // padding 12px on each side
      }
    );
  }

  return {
    navItem: navItemStyle,
    activeNavItem: Object.assign(
      Object.assign({}, navItemStyle),
      {
        fontStyle: 'italic',
        cursor: 'default'
      }
    )
  };
}