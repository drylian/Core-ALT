import React from 'react';
import MessageBox from './MessageBox';
import { useStoreState } from 'easy-peasy';

const FlashMessageRender = ({ byKey, className }) => {
  const flashes = useStoreState((state) =>
    state.flashes.items.filter((flash) => (byKey ? flash.key === byKey : true))
  );

  return flashes.length ? (
    <div className={className}>
      {flashes.map((flash, index) => (
        <React.Fragment key={flash.id || flash.type + flash.message}>
          {index > 0 && <div className="mt-2"></div>}
          <MessageBox status={flash.type} title={flash.title}>
            {flash.message}
          </MessageBox>
        </React.Fragment>
      ))}
    </div>
  ) : null;
};

export default FlashMessageRender;
