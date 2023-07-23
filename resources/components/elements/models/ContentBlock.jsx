import React, { useEffect } from 'react';
import FlashMessageRender from './FlashMessageRender';

const ContentBlock = ({ title, showFlashKey, className, children }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <>
      <div className="my-4 sm:my-10">
        {showFlashKey && <FlashMessageRender byKey={showFlashKey} className="mb-4" />}
        {children}
      </div>
      <div className="mb-4">
        <p className="text-center text-gray-500 text-xs">
          <a
            rel="noopener nofollow noreferrer"
            href="https://pterodactyl.io"
            target="_blank"
            className="no-underline text-gray-500 hover:text-gray-300"
          >
            Alternight®
          </a>
          &nbsp;&copy; 2020 - {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
};

export default ContentBlock;
