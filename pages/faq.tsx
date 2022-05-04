import React from 'react';
import { Button, Grid, Collapse, Text, Input, useTheme, Spinner, Spacer } from '@geist-ui/react';
import SearchIcon from '@geist-ui/react-icons/search';
import CreateTeamIcon from '@geist-ui/react-icons/userPlus';
import ProjectCard from '@/components/project-card';

const Page = () => {
  const theme = useTheme();

  return (
    <>
      <div className="page__wrapper">
        <div className="page__content">
          <Text h2>Frequently Asked Questions</Text>
          <div className="faqitem">
            <Collapse shadow title="Why Hulse?">
              <Text>
                Hulse makes self-hosting state-of-the-art open-source AI models simpler using your untapped computing
                resources. We are working hard to cover a wider range of state-of-the-art models, and to extend our
                features to the entire Machine Learning pipeline.
              </Text>
            </Collapse>
            <Spacer h={2} />
            <Collapse shadow title="What are clusters?">
              <Text>
                Clusters are groups of computers connected on Hulse. Each member of the cluster can download the Hulse
                desktop app and share their unused computing power.
              </Text>
            </Collapse>
            <Spacer h={2} />
            <Collapse shadow title="Who can use my computing power?">
              <Text>Only the members of your cluster can use your computing power, and no one else.</Text>
            </Collapse>
            <Spacer h={2} />
            <Collapse shadow title="How can I add members to my cluster?">
              <Text>
                Once you create your cluster you should get a cluster ID. Share this cluster ID with your team,
                community, or friends for them to join your cluster.
              </Text>
            </Collapse>
            <Spacer h={2} />
            <Collapse shadow title="How can I join a cluster?">
              <Text>
                To join a cluster, you need the cluster ID which is available to all members of a cluster. Ask your team
                for their cluster id or create a new one!
              </Text>
            </Collapse>
            <Spacer h={2} />
            <Collapse shadow title="Who can see my data?">
              <Text>
                For now, Hulse gives you a single API key shared across all your clusters. Your requests may thus be
                dispatched across computers from all of your clusters.
              </Text>
            </Collapse>
            <Spacer h={2} />
            <Collapse shadow title="Is my data safe?">
              <Text>
                Your data is safe. The Hulse beta is configured such that your data transits through our servers to your
                team's computers before being processed. We are working hard to develop the peer to peer technology
                allowing you to keep your data 100% local to your organization.
              </Text>
            </Collapse>
          </div>
        </div>
      </div>
      <style jsx>{`
        .page__wrapper {
          background-color: ${theme.palette.accents_1};
          min-height: calc(100vh - 172px);
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 60%;
          margin: 0 auto;
          padding: calc(${theme.layout.unit} * 2) ${theme.layout.pageMargin};
          box-sizing: border-box;
        }
        .faqitem {
          margin-top: 20px;
        }
        .actions-stack {
          display: flex;
          width: 100%;
        }
        .actions-stack :global(.input-wrapper) {
          background-color: ${theme.palette.background};
        }
        .actions-stack :global(input) {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
export default Page;
