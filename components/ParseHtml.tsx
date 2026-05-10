/* eslint-disable */
import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';

export default function ParseHTML({ htmlContent }:any) {
  const options = {
    replace: (domNode:any) => {
      if (domNode.type === 'tag' && domNode.name === 'img' && domNode.attribs) {
        const { src, alt, width, height } = domNode.attribs;

        return (
          <Image
            src={src}
            alt={alt || ''}
            width={parseInt(width) || 1000}
            height={parseInt(height) || 630}
            className="myImage"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ height: 'auto' }}
            loading="lazy"
            decoding="async"
            fetchPriority="auto"
          />
        );
      }
    },
  };

  return <>{parse(htmlContent, options)}</>;
}
