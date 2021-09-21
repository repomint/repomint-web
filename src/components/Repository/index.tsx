import axios from 'axios';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { UserReposType, RepoLangsType } from "src/types/octokit";

type Props = {
  repo: UserReposType;
  username: string;
}

const Repository = ({ repo, username }: Props) => {
  const [repoLangs, setRepoLangs] = useState<RepoLangsType[] | null>(null);

  useEffect(() => {
    const ghToken = Cookies.get('gh_token') || '';

    async function getRepoLangs() {
      const { data } = await axios.get(`http://localhost:4000/repos/langs?ghToken=${ghToken}&username=${username}&repo=${repo.name}`);
      const repoData = data.data?.data;
      const repoArray = [];
      for (const key of Object.keys(repoData)) {
        repoArray.push({
          key,
          value: repoData[key]
        })
      }
      setRepoLangs(repoArray);
    }

    if (repo && username) {
      getRepoLangs();
    }
  }, [username, repo])

  return (
    <div>
      <b>{repo.name}</b> <br />
      {
        repoLangs && repoLangs.map((repo) =>
          <>
            {repo.key}: {repo.value} &nbsp;
          </>
        )
      }
    </div>
  )
}

export default Repository;