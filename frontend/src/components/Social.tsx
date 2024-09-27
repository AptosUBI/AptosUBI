import { SocialIcon } from "react-social-icons";

function Social() {
  return (
    <section>
      <SocialIcon
        network="github"
        url="https://github.com/AptosUBI"
        target="_blank"
        rel="noopener noreferrer"
        bgColor="#2b2b2c"
        fgColor="white"
      />
      <SocialIcon
        network="x"
        url="https://x.com/aptos_ubi"
        target="_blank"
        rel="noopener noreferrer"
        bgColor="#2b2b2c"
        fgColor="white"
      />
      <SocialIcon
        network="youtube"
        url="https://www.youtube.com/@AptosUBI"
        target="_blank"
        rel="noopener noreferrer"
        bgColor="#2b2b2c"
        fgColor="white"
      />
    </section>
  );
}

export default Social;
