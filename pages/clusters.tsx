import React, { useState } from 'react';
import { Button, Grid, Input, useTheme, Spinner, Modal, Text, Spacer, Textarea } from '@geist-ui/react';
import SearchIcon from '@geist-ui/react-icons/search';
import CreateTeamIcon from '@geist-ui/react-icons/userPlus';
import ProjectCard from '@/components/project-card';
import ClusterCard from '@/components/cluster-card';
import Plus from '@geist-ui/icons/plus';
import { useRouter } from 'next/router';
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

  const { clusters, isLoading } = useClusters();

  const [state, setState] = useState(false);
  const handler = () => setState(true);
  const closeHandler = (event) => {
    setState(false);
    console.log('closed');
  };
  const descriptionRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const clusterIdRef = React.useRef(null);

  if (isLoading) return <Spinner />;
  const clusterOverviews = [];
  if (typeof clusters !== 'undefined' && typeof clusters.clusters !== 'undefined' && clusters.clusters.length > 0) {
    for (const [index, cluster] of clusters.clusters.entries()) {
      clusterOverviews.push(
        <Grid xs={24} sm={12} md={8}>
          <ClusterCard cluster={cluster} />
        </Grid>
      );
    }
  }

  const setChange = () => {
    console.log(window.localStorage.getItem('authToken'));
    fetch(process.env.NEXT_PUBLIC_HULSE_API_URL + 'cluster/create/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: nameRef.current.value, description: descriptionRef.current.value })
    }).then((res) => console.log(res.json()));
  };

  const setJoinChange = () => {
    console.log(window.localStorage.getItem('authToken'));
    fetch(process.env.NEXT_PUBLIC_HULSE_API_URL + 'cluster/join/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cluster_id: clusterIdRef.current.value })
    }).then((res) => console.log(res.json()));
  };

  return (
    <>
      <div className="page__wrapper">
        <div className="page__content">
          <div className="actions-stack">
            <Input scale={1.25} width="100%" label="Cluster Id" ref={clusterIdRef} />
            <div>
              <Button auto onClick={setJoinChange} type="secondary" marginLeft={1}>
                Join Cluster
              </Button>
            </div>

            <Button iconRight={<Plus />} marginLeft={1} px={0} width="48px" onClick={handler} />
            <Modal visible={state} onClose={closeHandler}>
              <Modal.Title>New Cluster</Modal.Title>
              <Modal.Content>
                <div>
                  <Text type="secondary">Cluster name:</Text>
                  <Input width="100%" initialValue="" placeholder="compute-pool-1" ref={nameRef} />
                </div>
                <Spacer h={0.5} />
                <Text type="secondary">Cluster description:</Text>
                <Textarea
                  width="100%"
                  placeholder="Pooling resources for the RL lab temporal-network project."
                  ref={descriptionRef}
                />
                <Spacer h={0.5} />
                <Text small i>
                  You will get an invite link to share with your team members in the next step.
                </Text>
              </Modal.Content>
              <Modal.Action passive onClick={() => setState(false)}>
                Cancel
              </Modal.Action>
              <Modal.Action
                passive
                onClick={() => {
                  setState(false);
                  setChange();
                }}
              >
                Create
              </Modal.Action>
            </Modal>
          </div>
          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            {clusterOverviews}
          </Grid.Container>
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
          max-width: 100%;
          margin: 0 auto;
          padding: calc(${theme.layout.unit} * 2) ${theme.layout.pageMargin};
          box-sizing: border-box;
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
