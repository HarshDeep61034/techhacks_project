import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Octokit } from "octokit";
const Payment = ({ bounty }) => {
  const navigate = useNavigate();
  const issueLink = bounty.issueLink;
  const issueLinkPart = issueLink.split("/");
  const owner = issueLinkPart[3];
  const repo = issueLinkPart[4];
  const issueNumber = issueLinkPart[6];
  const [issues, setIssues] = useState([]);
  const octokit = new Octokit({
    auth: "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",
  });
  async function checkIfMerged(owner, repo, issueNumber) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
    try {
      const issueData = await octokit.request(apiUrl, {
        owner: owner,
        repo: repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (issueData.data.state === "closed") {
        alert("Issue is closed");
        navigate("/checkoutPage");
      } else {
        alert("Issue is not closed yet");
      }
    } catch (error) {
      console.error("Error fetching data from GitHub API:", error.message);
    }
  }

  return (
    <section>
      <div className="product">
        <img src="../assets/bounty.png" alt="Bounty Vector Art" />
        <div className="description">
          <h3>{bounty.title}</h3>
          <h5>${bounty.price}</h5>
        </div>
      </div>
      <button
        onClick={() => checkIfMerged(owner, repo, issueNumber)}
        className="px-3 bg-blue-700 rounded-xl text-white py-2"
      >
        Checkout
      </button>
    </section>
  );
};
export default Payment;
