import React from 'react';

function Message({
  theme,
  size,
  children,
  align,
  style
}) {

  let className = 'message';
  if (theme) className += ` is-${theme}`;
  if (size) className += ` is-${size}`;
  if (align) className += ` has-text-${align}`;

  return (
    <article className={className} style={style}>
      <div className="message-body">
        {children}
      </div>
    </article>
  );
}

export default Message;