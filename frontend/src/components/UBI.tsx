import moment from "moment";
import { useState } from "react";

function UBI() {
  // Placeholder values
  const address = "@0x123";
  const capital = 10_000_000;
  const distributed = 200_000;
  const next = moment().format("MMMM Do YYYY, h:mm:ss a");
  const participants = 15;
  const contributors = 7;
  const estimated = 1000;
  const req_contrib = "None.";
  const req_partic = "Verified identity.";
  const wip_contrib = "Integrating other sources of sustainable funding.";
  const wip_partic =
    "Integrating authentication with Passkeys biometrics (facial recognition or fingerprint).";

  const [status, setStatus] = useState<boolean>(false);

  const registerParticipant = async () => {
    setStatus(true);
  };

  const registerContributor = async () => {
    setStatus(true);
  };

  const leaveParticipant = async () => {
    setStatus(true);
  };

  const leaveContributor = async () => {
    setStatus(true);
  };

  return (
    <>
      <section className="container">
        <p>
          UBI Contract Address:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://explorer.aptoslabs.com/account/${address}?network=testnet`}
          >
            {address}...
          </a>
        </p>
        <p>Total capital left: {capital}</p>
        <p>Total distributed by now: {distributed}</p>
        <p>Next distribution of UBI: {next}</p>
      </section>
      <div>
        {status && <div className="newsletter-alert">COMING SOON...</div>}
        <section className="container">
          <p>Total registered participants: {participants}</p>
          <button onClick={registerParticipant}>
            Register As Participant
          </button>{" "}
          {"     "}
          <button onClick={leaveParticipant}>Leave</button>
          <p>Estimated distribution per participant: {estimated}</p>
          <p>Requirements: {req_partic}</p>
          <p className="wrap-text">WIP: {wip_partic}</p>
        </section>
        <section className="container">
          <p>Total registered contributors: {contributors}</p>
          <button onClick={registerContributor}>
            Register As Contributor
          </button>{" "}
          {"     "}
          <button onClick={leaveContributor}>Leave</button>
          <p>Requirements: {req_contrib}</p>
          <p className="wrap-text">WIP: {wip_contrib}</p>
        </section>
      </div>
    </>
  );
}

export default UBI;
