import React from 'react';

function Message({
  theme,
  children
}) {

  let className = 'message';
  if (theme) className += ` is-${theme}`;

  return (
    <article className={className}>
      <div className="message-body">
        {children}
      </div>
    </article>
  );
}

export default Message;