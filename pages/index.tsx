import React from 'react';
import NextLink from 'next/link';
import { Text, Link, useTheme, Spinner, Avatar, Snippet } from '@geist-ui/react';
import Heading from '@/components/heading';
import EventListItem from '@/components/activity-event';
import OverviewCluster from '@/components/overview-cluster';
import Download from '@geist-ui/icons/download';
import Anchor from '@geist-ui/icons/anchor';
import useSWR from 'swr';

// TODO: strongly type this
function fetcher(url, authToken) {
  return fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Token ' + authToken, 'Content-Type': 'application/json' }
  }).then((res) => res.json());
}

/*Fetch cluster information for user*/
function useClusters() {
  console.log(process.env.NEXT_PUBLIC_HULSE_API_URL + 'clusters/');
  const { data, error } = useSWR(
    [
      process.env.NEXT_PUBLIC_HULSE_API_URL + 'clusters/',
      typeof window !== 'undefined' && window.localStorage.getItem('authToken')
    ],
    fetcher
  );
  return {
    clusters: data,
    isLoading: !error && !data,
    isError: error
  };
}

const Page = () => {
  const theme = useTheme();

  // dynamically load current user clusters
  const { clusters, isLoading } = useClusters();
  if (isLoading) return <Spinner />;

  const clusterOverviews = [];
  if (typeof clusters !== 'undefined' && typeof clusters.clusters !== 'undefined' && clusters.clusters.length > 0) {
    for (const [index, cluster] of clusters.clusters.entries()) {
      if (index > 2) break;
      clusterOverviews.push(<OverviewCluster cluster={cluster} />);
    }
  } else {
    clusterOverviews.push(<Text h5>You are not part of any cluster yet.</Text>);
  }

  return (
    <>
      <Heading />
      <div className="page__wrapper">
        <div className="page__content">
          <div className="projects">
            {clusterOverviews}
            <NextLink href="/clusters" passHref>
              <Link className="view-all" color underline>
                View All Clusters
              </Link>
            </NextLink>
          </div>

          <div className="recent-activity">
            <Text h2 className="recent-activity__title">
              Getting Started
            </Text>
            <div className="activity-event">
              <Avatar className="activity-event__avatar" text="1" />
              <Link href="https://hulse-desktop.s3.amazonaws.com/universal2/Hulse.dmg" color block>
                <Text className="activity-event__message">Download Hulse macOS app (Intel)</Text>
              </Link>

              <Text className="activity-event__created-at">
                <Download />
              </Text>
            </div>

            <div className="activity-event">
              <Avatar className="activity-event__avatar" text="2" />
              <Link href="/clusters" color block>
                <Text className="activity-event__message">Create or join a compute cluster</Text>
              </Link>
              <Text className="activity-event__created-at">
                <Anchor />
              </Text>
            </div>

            <div className="activity-event">
              <Avatar className="activity-event__avatar" text="3" />
              <Snippet
                text="pip install hulse" //{typeof window !== 'undefined' && window.localStorage.getItem('authToken')}
                type="success"
                width="90%"
                toastText="Pip install command copied to clipboard!"
                margin={'auto'}
                marginRight={0}
              />
            </div>

            <div className="activity-event">
              <Avatar className="activity-event__avatar" text="4" />
              <Snippet
                symbol="API key:"
                text={typeof window !== 'undefined' && window.localStorage.getItem('authToken')}
                type="success"
                toastText="API key copied to clipboard!"
                className="activity-event__message"
                width="80%"
              />
            </div>

            <NextLink href={process.env.NEXT_PUBLIC_HULSE_DOCS_URL} passHref>
              <Link className="view-all" color underline>
                Learn more
              </Link>
            </NextLink>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page__wrapper {
          background-color: ${theme.palette.accents_1};
          min-height: calc(78vh - 172px);
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          transform: translateY(-35px);
          box-sizing: border-box;
        }
        .projects {
          width: 50%;
          max-width: 100%;
          margin-right: calc(4 * ${theme.layout.gap});
        }
        .projects :global(.project__wrapper):not(:last-of-type) {
          margin-bottom: calc(1.5 * ${theme.layout.gap});
        }
        .recent-activity {
          max-width: 100%;
          width: 40%;
        }
        .activity-event__message {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .recent-activity :global(.recent-activity__title) {
          font-size: 0.875rem;
          font-weight: 700;
          margin: 0 0 calc(3 * ${theme.layout.gapHalf});
        }
        .page__content :global(.view-all) {
          font-size: 0.875rem;
          font-weight: 700;
          margin: calc(1.5 * ${theme.layout.gap}) 0;
          text-align: center;
        }
        @media (max-width: ${theme.breakpoints.sm.max}) {
          .page__content {
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }
          .projects {
            width: 100%;
            margin-right: unset;
          }
          .recent-activity {
            max-width: 100%;
            width: 100%;
          }
        }
        .activity-event {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          padding: ${theme.layout.gapHalf} 0;
          border-bottom: 1px solid ${theme.palette.border};
        }
        .activity-event :global(.activity-event__avatar) {
          width: 2rem;
          height: 2rem;
          margin-right: ${theme.layout.gapHalf};
        }
        .activity-event :global(.activity-event__message) {
          flex: 1;
          margin: 0;
        }
        .activity-event :global(.activity-event__created-at) {
          color: ${theme.palette.accents_4};
          margin: 0 0 0 auto;
          padding-left: ${theme.layout.gapHalf};
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default Page;
