
import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface PreviewFrameProps {
  html: string;
  device: 'desktop' | 'tablet' | 'mobile';
  businessName: string;
}

const PreviewFrame = ({ html, device, businessName }: PreviewFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && html) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  const getFrameStyle = () => {
    switch (device) {
      case 'mobile':
        return {
          width: '375px',
          height: '667px',
          maxWidth: '100%'
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          maxWidth: '100%'
        };
      default:
        return {
          width: '100%',
          height: '100%'
        };
    }
  };

  const frameStyle = getFrameStyle();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          Live Preview - {businessName}
        </h3>
        <div className="text-sm text-muted-foreground capitalize">
          {device} View
        </div>
      </div>

      <Card className="flex-1 p-4 bg-white overflow-auto">
        <div className="flex justify-center items-start h-full">
          <div 
            className={`${device !== 'desktop' ? 'border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg' : 'w-full h-full'}`}
            style={device !== 'desktop' ? frameStyle : {}}
          >
            <iframe
              ref={iframeRef}
              title={`${businessName} Preview`}
              className="w-full h-full border-0"
              style={device === 'desktop' ? { width: '100%', height: '100%' } : { width: '100%', height: '100%' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PreviewFrame;
