// external deps
import axios from 'axios';
import { Button } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
// internal deps
import { UserReposType, RepoLangsType } from "src/types/octokit";

type Props = {
  repo: UserReposType;
  currentUser: string;
  onClickRepo: ({ repo }: { repo: UserReposType }) => void;
}

const Repository = ({ repo, currentUser, onClickRepo }: Props) => {
  const [repoLangs, setRepoLangs] = useState<RepoLangsType[] | null>(null);

  useEffect(() => {
    const ghToken = Cookies.get('gh_token') || '';

    async function getRepoLangs() {
      const { data } = await axios.get(`http://localhost:4000/repos/langs?ghToken=${ghToken}&username=${repo.owner.login}&repo=${repo.name}`);
      const repoData = data.data?.data;
      const repoArray = [];

      if (repoData) {
        for (const key of Object.keys(repoData)) {
          repoArray.push({
            key,
            value: repoData[key]
          })
        }
        setRepoLangs(repoArray);
      }
    }

    if (repo) {
      getRepoLangs();
    }
  }, [repo])

  return (
    <Button type="primary" style={{display: 'block', height: '100%', textAlign: 'left', marginBottom: '1rem'}}
      onClick={() => onClickRepo({ repo })}>
      <b>{repo.name} </b> 
      {
        currentUser === repo.owner.login ?
        'Owned'
        :
        'Collaborated'
      }
      <br />
      {
        repoLangs && repoLangs.map((repo, index) =>
          <div key={`${repo.key}-${index}`}>
            {repo.key}: {repo.value} &nbsp; <br/>
          </div>
        )
      }
    </Button>
  )
}

export default Repository;