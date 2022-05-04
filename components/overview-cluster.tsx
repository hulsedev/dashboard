import React, { useState } from 'react';
import {
  Button,
  Text,
  Link,
  Tooltip,
  Card,
  Dot,
  Tag,
  useTheme,
  Modal,
  Textarea,
  Input,
  Snippet,
  Spacer
} from '@geist-ui/react';
import * as Icons from 'react-feather';
import Users from '@geist-ui/icons/users';
interface Props {
  projectId: string;
  createdAt: string;
  repo: string;
}

export type OverviewProjectProps = Props;

const OverviewProject: React.FC<OverviewProjectProps> = ({ cluster }) => {
  const theme = useTheme();

  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const editHandler = () => setEdit(true);
  const deleteHandler = () => setRemove(true);

  const closeEditHandler = (event) => {
    setEdit(false);
    console.log('closed');
  };
  const [leave, setLeave] = useState(false);
  const leaveHandler = () => setLeave(true);

  const closeLeaveHandler = (event) => {
    setLeave(false);
    console.log('closed');
  };
  const closeDeleteHandler = (event) => {
    setRemove(false);
    console.log('closed');
  };
  const descriptionRef = React.useRef(null);
  const nameRef = React.useRef(null);

  const setDeleteChange = () => {
    fetch('http://localhost:8000/cluster/delete/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cluster_id: cluster.id })
    }).then((res) => console.log(res.json()));
  };

  const setEditChange = () => {
    fetch('http://localhost:8000/cluster/edit/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cluster_id: cluster.id,
        name: nameRef.current.value,
        description: descriptionRef.current.value
      })
    }).then((res) => console.log(res.json()));
  };

  const setLeaveChange = () => {
    fetch('http://localhost:8000/cluster/leave/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cluster_id: cluster.id })
    }).then((res) => console.log(res.json()));
  };

  return (
    <>
      <div className="project__wrapper">
        <Card className="project__card" shadow>
          <div className="project__title">
            <Text h3>
              {cluster.name}{' '}
              {cluster.is_admin && (
                <Tag className="project__environment-tag" type="secondary">
                  admin
                </Tag>
              )}
            </Text>
            {cluster.is_admin && (
              <div className="project__subtitle">
                <Button className="project__visit-button" height={0.8} auto onClick={editHandler}>
                  Edit
                </Button>
                <Modal visible={edit} onClose={closeEditHandler}>
                  <Modal.Title>Update Cluster</Modal.Title>
                  <Modal.Content>
                    <div>
                      <Text type="secondary">Cluster name:</Text>
                      <Input width="100%" initialValue={cluster.name} ref={nameRef} />
                    </div>
                    <Spacer h={0.5} />
                    <Text type="secondary">Cluster description:</Text>
                    <Textarea width="100%" initialValue={cluster.description} ref={descriptionRef} />
                    <Spacer h={0.5} />
                  </Modal.Content>
                  <Modal.Action passive onClick={() => setEdit(false)}>
                    Cancel
                  </Modal.Action>
                  <Modal.Action
                    passive
                    onClick={() => {
                      setEdit(false);
                      setEditChange();
                    }}
                  >
                    Update
                  </Modal.Action>
                </Modal>
                <Spacer w={0.5} />
                <Button className="project__visit-button" height={0.8} auto type="error" ghost onClick={deleteHandler}>
                  Delete
                </Button>
                <Modal visible={remove} onClose={closeDeleteHandler}>
                  <Modal.Title>Delete Cluster</Modal.Title>
                  <Modal.Content>
                    <Text type="secondary">Are you sure you want to delete the cluster {cluster.name}?</Text>
                  </Modal.Content>
                  <Modal.Action passive onClick={() => setRemove(false)}>
                    Cancel
                  </Modal.Action>
                  <Modal.Action
                    passive
                    onClick={() => {
                      setRemove(false);
                      setDeleteChange();
                    }}
                  >
                    Delete
                  </Modal.Action>
                </Modal>
              </div>
            )}
            {!cluster.is_admin && (
              <div>
                <Button className="project__visit-button" height={0.8} auto type="error" ghost onClick={leaveHandler}>
                  Leave
                </Button>
                <Modal visible={leave} onClose={closeLeaveHandler}>
                  <Modal.Title>Leave Cluster</Modal.Title>
                  <Modal.Content>
                    <Text type="secondary">Are you sure you want to leave the cluster {cluster.name}?</Text>
                  </Modal.Content>
                  <Modal.Action passive onClick={() => setLeave(false)}>
                    Cancel
                  </Modal.Action>
                  <Modal.Action
                    passive
                    onClick={() => {
                      setLeave(false);
                      setLeaveChange();
                    }}
                  >
                    Leave
                  </Modal.Action>
                </Modal>
              </div>
            )}
          </div>
          <div>
            <Text small>Description: {cluster.description}</Text>
            <Spacer h={1} />
            <Dot className="project__deployment" type="success">
              <Text small>Active</Text>
              <span className="project__created-at">Created at: {cluster.created_at}</span>
            </Dot>
            <Spacer h={1} />
            <Snippet
              symbol="Cluster Id:"
              text={cluster.id}
              type="secondary"
              toastText="Cluster id copied to clipboard!"
              width="100%"
            />
          </div>
          <Card.Footer className="project__footer">
            <Users />
            <Text className="project__repo">{cluster.member_count}</Text>
          </Card.Footer>
        </Card>
      </div>
      <style jsx>{`
        .project__wrapper :global(.project__card) {
          padding: 0 !important;
        }
        .project__title {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: ${theme.layout.gap};
        }
        .project__subtitle {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .project__title :global(h3) {
          margin: 0;
        }
        .project__wrapper :global(.project__deployment) {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: ${theme.layout.gapQuarter};
        }
        .project__wrapper :global(.project__deployment) :global(.icon) {
          background-color: #50e3c2;
        }
        .project__wrapper :global(.project__deployment) :global(.label) {
          display: flex;
          align-items: center;
          flex: 1;
          overflow: hidden;
          text-transform: unset;
        }
        .project__wrapper :global(.project__deployment) :global(a) {
          font-size: 0.875rem;
          font-weight: 500;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .project__wrapper :global(.project__environment-tag) {
          color: ${theme.palette.foreground};
          background: ${theme.palette.accents_1};
          border-color: ${theme.palette.accents_2};
          border-radius: 1rem;
          padding: 2px 6px;
          height: unset;
          font-size: 0.75rem;
          font-weight: 500;
          margin-left: ${theme.layout.gapHalf};
        }
        .project__wrapper :global(.project__created-at) {
          color: ${theme.palette.accents_4};
          font-size: 0.875rem;
          text-align: right;
          margin: 0 0 0 ${theme.layout.gapHalf};
        }
        .heading__name :global(.headding__user-role) {
          background: ${theme.palette.accents_1};
          border-color: ${theme.palette.accents_2};
          border-radius: 1rem;
          padding: 0.175rem 0.5rem;
          height: unset;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          margin-left: ${theme.layout.gapQuarter};
        }
        .project__wrapper :global(.project__footer) {
          display: flex;
          align-items: center;
          font-weight: 500;
        }
        .project__wrapper :global(.project__repo) {
          font-size: 0.875rem;
          font-weight: 500;
          margin-left: ${theme.layout.gapQuarter};
        }
        @media (max-width: ${theme.breakpoints.xs.max}) {
          .project__wrapper :global(.project__visit-button) {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default OverviewProject;
