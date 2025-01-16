// app/issue/[slug]/ClientIssuePage.tsx

'use client';

import React, { useState } from 'react';
import IssueViewer from '@/components/IssueViewer';
import CommentsSection from '@/components/CommentsSection';
import ErrorBoundary from '@/components/ErrorBoundary';

interface IssuePage {
  _key?: string;
  _type?: string;
  asset?: {
    _ref: string;
    _type: string;
  };
  caption?: string;
  alt?: string;
  url?: string;
}

interface ClientIssuePageProps {
  issueId: string;
  coverImageUrl: string;
  title?: string;
  initialViews?: number;
  initialCommentsCount?: number;
  pages: IssuePage[];
}

const ClientIssuePage: React.FC<ClientIssuePageProps> = ({
  issueId,
  coverImageUrl,
  title,
  initialViews,
  initialCommentsCount = 0,
  pages,
}) => {
  const [commentsCount, setCommentsCount] = useState<number>(
    initialCommentsCount
  );

  const handleCommentsUpdated = (count: number) => {
    setCommentsCount(count);
  };

  return (
    <main>
      <ErrorBoundary>
        <IssueViewer
          issueId={issueId}
          coverImageUrl={coverImageUrl}
          title={title}
          initialViews={initialViews}
          pages={pages}
          commentsCount={commentsCount}
        />
      </ErrorBoundary>
      <CommentsSection
        issueId={issueId}
        onCommentsUpdated={handleCommentsUpdated}
      />
    </main>
  );
};

export default ClientIssuePage;