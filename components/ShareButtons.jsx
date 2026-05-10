'use client';
import React from 'react';
/* eslint-disable */

/**
 * @typedef {{ text: string; url: string }} ShareButtonsProps
 */

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  PinterestIcon,
} from 'react-share';

const ShareButtons = React.memo(
  /**
   * @param {ShareButtonsProps} props
   */
  function ShareButtons({ text, url }) {
    return (
<fieldset className="text-lg border-2 border-[#f26419] rounded-lg px-2 mb-4 max-w-sm mt-4 self-end">
      <legend className="px-2 text-xl font-semibold">
        Share
      </legend>
      <div id="laravel-share-this" className="flex justify-center gap-1 flex-wrap" style={{ color: 'black' }}>

        {/* Facebook */}
        <FacebookShareButton url={url} quote={text} hashtag="#fairexplain">
          <div className="flex items-center justify-center w-12 h-12">
            <FacebookIcon size={24} round />
          </div>
        </FacebookShareButton>

        {/* Twitter/X */}
        <TwitterShareButton url={url} title={text} hashtags={['fairexplain']}>
          <div className="flex items-center justify-center w-12 h-12">
            <XIcon size={24} round />
          </div>
        </TwitterShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton url={url} title={text} summary={text} source="Fairexplain">
          <div className="flex items-center justify-center w-12 h-12">
            <LinkedinIcon size={24} round />
          </div>
        </LinkedinShareButton>

        {/* Pinterest */}
        <PinterestShareButton url={url} description={text}>
          <div className="flex items-center justify-center w-12 h-12 ">
            <PinterestIcon size={24} round />
          </div>
        </PinterestShareButton>

      </div>
    </fieldset>
  );
});

export default ShareButtons;
