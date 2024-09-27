import Faq from "react-faq-component";

function FAQ() {
  const data = {
    title: "Frequently Asked Questions",
    rows: [
      {
        title: "What is the main idea of this project",
        content: "To create Universal Basic Income on Aptos blockchain",
      },
      {
        title: "What is UBI",
        content:
          "UBI stands for Universal Basic Income. Please check Wikipedia page for formal definition: https://en.wikipedia.org/wiki/Universal_basic_income",
      },
      {
        title: "What is APTOS",
        content:
          "APTOS positions itself as the world's most production-ready blockchain. Please check their official documentation for more details: https://aptosfoundation.org",
      },
      {
        title: "Why are you building this",
        content:
          "We started biulding this project for the Aptos Code Collision hackaton 2024 to research possibilities of UBI on Aptos blockchain. More information here: https://dorahacks.io/buidl/16647",
      },
      {
        title: "I have more unanswered questions",
        content:
          "Please check our official GitHub account (https://github.com/AptosUBI) and build page (https://dorahacks.io/buidl/16647). If still unclear, do not hesitate to contact us using provided contact details or via any official social media platform.",
      },
    ],
  };

  return (
    <section>
      <Faq data={data} />
    </section>
  );
}

export default FAQ;
